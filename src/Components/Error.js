import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  const { status, statusText } = err;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-red-600 text-5xl font-bold">
        {status} !
      </p> 
      <h2 className="text-xl font-semibold text-red-600 my-3">
        Oops! Something went wrong
      </h2>
     
      <p className="text-red-600 text-xl font-semibold">
        {statusText}
      </p>
    </div>
  );
};

export default Error;
