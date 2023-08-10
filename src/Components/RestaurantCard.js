import React from "react";
import { IMG_CDN_URL } from "../Utils/Constant";
const RestaurantCard = ({ name, cuisines, avgRating, cloudinaryImageId }) => {
 
  return (
    <div>
      <img className="w-80 rounded-2xl" src={IMG_CDN_URL + cloudinaryImageId} alt="restaurantImages" />
      <h3>{name}</h3>
      <h4>{avgRating}</h4>
      <p>{cuisines}</p>
    </div>
  );
};

export default RestaurantCard;
