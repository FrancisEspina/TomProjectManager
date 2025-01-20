import React from "react";
import { Link } from "react-router-dom";
const FourOFour = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-center text-center h-screen gap-2 flex-col">
          <div className="">
            <h1 className="text-amber-500" style={{ fontSize: "100px" }}>
              <b>404</b>
            </h1>
            <h2>Page Not Found</h2>
          </div>
          <br />
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FourOFour;
