import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL, swiggy_MENU_API } from "./constant";
import Shimmer from "./Shimmer";
import { addItem } from "../Utils/CartSlice";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
  const { resid } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(swiggy_MENU_API + resid);
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

  const addFoodItem = (menuItems) => {
    dispatch(addItem(menuItems));
  };

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="w-full mx-auto p-4 md:w-3/4 lg:w-1/2 xl:w-2/3 2xl:w-1/2">
      <div>
        <img
          className="w-48 mx-auto mb-4"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <h1 className="font-bold text-xl mb-2">{restaurant?.name}</h1>
        <p className="restaurant-tags text-gray-600">
          {restaurant?.cuisines?.join(", ")}
        </p>
      </div>

      <div>
        <h3 className="font-bold mt-6 text-center md:mt-11">
          Recommended Items
        </h3>
        {menuList.map((menuItems) => (
          <div
            className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4 py-4 border-b border-gray-700"
            key={menuItems.id}
          >
            <div className="flex-1 md:pr-8">
              <h2 className="text-lg font-semibold">{menuItems?.name}</h2>
              <p className="text-gray-600">{menuItems?.description}</p>
            </div>
            <div className="flex-none">
              <img
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" +
                  menuItems?.imageId
                }
                alt="Items"
                className="w-16 h-16 object-cover rounded-md"
              />
            </div>
            <div className="flex-none">
              <p className="text-lg font-semibold">
                {menuItems?.price > 0
                  ? new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(menuItems?.price / 100)
                  : " "}
              </p>
              <button
                className="bg-green-400 px-3 py-1 text-white rounded-md"
                onClick={() => addFoodItem(menuItems)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
