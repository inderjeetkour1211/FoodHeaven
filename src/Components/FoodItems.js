import React from "react";
import { IMG_CDN_URL } from "../Utils/Constant";
const FoodItem = ({ name, price, imageId }) => {
  return (
    <div className=" w-1/3">
      <div className=" ">
        <img
          className="w-24 rounded-2xl "
          src={IMG_CDN_URL + imageId}
          alt="restaurantImages"
        />
        <h3 className="my-3">{name}</h3>
        <h4>&#8377;{price / 100}</h4>
        
      </div>
    </div>
  );
};

export default FoodItem;
