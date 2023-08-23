import React from "react";
import { useSelector } from "react-redux";
import FoodItem from "./FoodItems";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-screen-lg mx-auto mt-20 p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column (Items) */}
        <div className="md:order-1">
          <h1 className=" text-center md:text-left font-bold text-2xl mb-7 ">
            Cart Items
          </h1>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p>Your Cart is empty</p>
            ) : (
              cartItems.map((item) => <FoodItem key={item.id} {...item} />)
            )}
          </div>
        </div>

        {/* Right Column (Total and Checkout) */}
        <div className="md:order-2">
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <h2 className="text-xl text-center md:text-left font-bold mb-4">Order Summary</h2>
            {cartItems.length > 0 && (
              <div className="mb-4">
                <p className="text-center md:text-left">Total Items: {cartItems.length}</p>
                <p className="text-center md:text-left">Total Price: &#8377;{totalPrice / 100}</p>
              </div>
            )}
            {cartItems.length > 0 && (
             <button
             className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 mx-auto flex md:mx-0"
           >
             Checkout
           </button>
           
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
