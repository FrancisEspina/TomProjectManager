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
      className={`flex items-center gap-1 p-2 rounded-lg max-h-9 ${
        props.color ? props.color : "bg-gray-200"
      }`}
    >
      {props.icon && <props.icon className="size-4" />}
      {props.text && <p>{props.text}</p>}
    </button>
  );
}

export default ButtonIcon;
