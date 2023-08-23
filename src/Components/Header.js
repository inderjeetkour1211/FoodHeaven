import React, { useState } from "react";
import AppLogo from "../Assets/Images/AppLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import useOnline from "../Utils/useOnline";
const Header = () => {
  const [toggle, setToggle] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const online = useOnline(true);
  return (
    <div className="w-full bg-gray-800 relative"> {/* Added relative positioning */}
      <div className="flex max-w-[1240px] mx-auto  md:flex-row justify-between items-center  p-4 text-white">
        {/* Logo */}
        <div className="w-20 mb-4 md:mb-0 md:w-16">
          <Link to={"/"}>
            <img src={AppLogo} alt="FoodHeaven Logo" className="w-full" />
          </Link>
        </div>

        {/* Navbar */}
        <div>
          {toggle ? (
          
            <AiOutlineClose
              onClick={() => setToggle(!toggle)}
              className="md:hidden block text-3xl"
            />
          ) : (
            <AiOutlineMenu
            onClick={() => setToggle(!toggle)}
            className="md:hidden block text-3xl"
          /> 
          )}
          <ul className="hidden md:flex gap-10">
            <li className="cursor-pointer hover:text-gray-200 mb-2 md:mb-0">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-200 mb-2 md:mb-0">
              <Link to={"/about"}>About</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-200">
              <Link to={"/cart"}>Cart {cartItems.length}</Link>
            </li> 
            <li>
             {
              online ? (<h2 className="text-md"> 🟢 Online</h2>) : (<h2 className=" text-md"> 🔴Offline</h2>)
             }
            </li>
          </ul>
          {/* Mobile responsive menu */}
          <ul
            className={`md:hidden p-4 absolute bg-gray-800 w-full h-screen top-[100px]  ${
              toggle ? "left-0" :  "-left-full"   // Adjust positioning
            }`}
            style={{ zIndex: toggle ? 10 : -1}} // Added z-index
          > 
           <li>
             {
              online ? (<h2 className="text-md"> 🟢 Online</h2>) : (<h2 className=" text-md"> 🔴Offline</h2>)
             }
            </li>
            <li className="cursor-pointer hover:text-gray-200 pt-5" >
              <Link to={"/"}>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-200 pt-5" >
              <Link to={"/about"}>About</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-200 pt-5" >
              <Link to={"/cart"}>Cart {cartItems.length}</Link>
            </li> 
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
