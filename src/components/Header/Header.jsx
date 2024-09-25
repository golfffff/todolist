import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="">
      <h1 className="">{props.txt}</h1>
    </div>
  );
};

export default Header;
