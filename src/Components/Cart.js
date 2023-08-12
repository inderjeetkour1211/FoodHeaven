import React from "react";
import { useSelector } from "react-redux";
import FoodItem from "./FoodItems";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="w-1/2 bg-slate-50 my-20 mx-auto">
      <h1 className="text-center mt-9 font-bold">
        Cart Items <br />
        <span>
          {cartItems.length === 0
            ? "Your Cart is empty"
            : `Number of Items in the cart, ${cartItems.length}`}
        </span>
      </h1>
      <div className="flex flex-wrap">
        <div className=" mt-14 w-2/3">
          {cartItems.map((item) => (
            <FoodItem key={item.id} {...item} />
          ))}
        </div>
        <div>
          <p>Total Price: &#8377;{totalPrice / 100}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
