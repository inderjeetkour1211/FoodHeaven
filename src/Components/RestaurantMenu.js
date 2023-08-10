import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./constant";
import { swiggy_menu_api_URL } from "../Utils/Constant";
import Shimmer from "./Shimmer";
import { addItem } from "../Utils/CartSlice";
import { useDispatch } from "react-redux";
const RestaurantMenu = () => {
  const RESTAURANT_TYPE_KEY =
    "type.googleapis.com/swiggy.presentation.food.v2.Restaurant";
  const { resid } = useParams();
  const [restaurant, setRestaurant] = useState([]);

  const [menuList, setMenuList] = useState([]);
const dispatch = useDispatch()
  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.659015&lng=76.8211601&catalog_qa=undefined&submitAction=ENTER&restaurantId=" +
        resid
    );

    const json = await data.json();

    const restaurantData = json?.data?.cards[0]?.card?.card?.info;

    setRestaurant(restaurantData);

    const menuList =
      json.data?.cards
        ?.find(
          (card) => card.groupedCard && card.groupedCard.cardGroupMap.REGULAR
        )
        .groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
          (card) =>
            card?.card?.card["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
            card?.card?.card?.title === "Recommended"
        )
        ?.card?.card.itemCards?.map((itermCard) => itermCard?.card?.info) || [];
    setMenuList(menuList);
  }

  const handleAddItem =()=>{
    dispatch(addItem("  "))
  }


  return !restaurant ? (
    <Shimmer />
  ) : (
    <div>
      <div>
        <h1> Restaurant id: {resid}</h1>

        <h2>{restaurant?.name}</h2>
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />

        <h2 className="restaurant-title">{restaurant?.name}</h2>
        <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>

        <i className="fa-solid fa-star"></i>
        <span>{restaurant?.avgRating}</span>
      </div>

      <div>
        <button
          className="p-2 m-5 bg-green-100"
          onClick={() => handleAddItem()}
        >
          Add Items
        </button>
      </div>
      <div>
        <h3>Menu</h3>

        {menuList.map((menuItems) => (
          <div className="flex">
            <div>
              <h2>{menuItems?.name}</h2>

              <p className="item-cost">
                {menuItems?.price > 0
                  ? new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(menuItems?.price / 100)
                  : " "}
              </p>
              <p> {menuItems?.description}</p>
            </div>

            <div>
              <img
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                  menuItems?.imageId
                }
                alt="Items"
              />

              <button className=" bg-green-400 p-2" onClick={function addFoodItem(menuItems){
  dispatch(addItem(menuItems))
}}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
