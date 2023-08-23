import React from "react";
import { IMG_CDN_URL } from "../Utils/Constant";
const FoodItem = ({ name, price, imageId }) => {
  return (
    <div className=" w-1/3 mx-auto md:mx-0">
      <div className="items-center ">
        <img
          className="w-[400px] rounded-2xl items-center mx-auto "
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
