import React from "react";
import AppLogo from "../Assets/Images/AppLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
const Header = () => {
const cartItems = useSelector(store => store.cart.items);

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
      {/* logo */}
      <div className="w-16">
       <Link to ={"/"}> <img src={AppLogo} alt="FoodHeaven Logo" /></Link>
      </div>

      {/* navbar */}
      <div>
        <ul className="flex space-x-4">
        <li className="cursor-pointer hover:text-gray-200"><Link to={"/"}>Home</Link></li>
          <li className="cursor-pointer hover:text-gray-200"><Link to={"/about"}>About</Link></li>
          <li className="cursor-pointer hover:text-gray-200"><Link to={"/contact"}>Contact Us</Link></li>
          <li className="cursor-pointer hover:text-gray-200"><Link to={"/cart"}>Cart {cartItems.length}</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
