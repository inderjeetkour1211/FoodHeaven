import React from "react";
import AppLogo from "../Assets/Images/AppLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-4 text-white">
      {/* Logo */}
      <div className="w-16 mb-4 md:mb-0 md:w-16">
        <Link to={"/"}>
          <img src={AppLogo} alt="FoodHeaven Logo" className="w-full" />
        </Link>
      </div>

      {/* Navbar */}
      <div>
        <ul className="flex flex-col md:flex-row space-x-0 md:space-x-4">
          <li className="cursor-pointer hover:text-gray-200 mb-2 md:mb-0">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-200 mb-2 md:mb-0">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-200">
            <Link to={"/cart"}>Cart {cartItems.length}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
