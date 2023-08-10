import React from "react";
import { useRouteError } from "react-router-dom";
const Error = () => {
    const err = useRouteError();
    const { status, statusText } = err;
    return (
        <div>
            <h1>Oops! Something went wrong</h1>
            <p>
                {status} : {statusText}
            </p>
        </div>
    );
};

export default Error;
