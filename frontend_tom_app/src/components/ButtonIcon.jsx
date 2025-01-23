import React from "react";
import * as Outlined from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function ButtonIcon(props) {
  const navigate = useNavigate();

  const handlClick = (event) => {
    event.preventDefault(); // Prevent default anchor or form behavior
    navigate(props.path && props.path);
  };

  return (
    <button
      onClick={handlClick}
      className={`flex justify-center items-center gap-1 center p-2 rounded-lg max-h-9 ${
        props.width
      }  ${props.color ? props.color : "bg-gray-200"}`}
    >
      {props.icon && <props.icon className="size-4" />}
      {props.text && <p className="hidden lg:block">{props.text}</p>}
    </button>
  );
}

export default ButtonIcon;
