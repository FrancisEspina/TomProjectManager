import React from "react";
import * as Outlined from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function ButtonIcon(props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(props.path && props.path)}
      className={`flex bg-gray-200 items-center gap-1 p-2 rounded-md max-h-9 ${
        props.color ? `bg-${props.color}-300` : ""
      }`}
    >
      {props.icon && <props.icon className="size-4" />}
      {props.text && <p>{props.text}</p>}
    </button>
  );
}

export default ButtonIcon;
