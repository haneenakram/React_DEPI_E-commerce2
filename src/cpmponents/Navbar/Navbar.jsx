import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";

export default function Navbar({ handleSideBar, handleCart,cart }) {
  return (
    <div className=" w-full p-4 bg-slate-600 ">
      <div className="flex w-full  justify-between items-center bg-slate-600 ">
        <div className="flex items-center space-x-4">
          <i
            className="fa fa-bars sidebar-bar"
            aria-hidden="true"
            onClick={handleSideBar}
          ></i>
          <div className="w-3/6">
            <a href="#">
              <img
                src={require("../../assets/images/logo.png")}
                alt="logo"
                className=""
              />
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <i className="fa fa-bars sidebar-bar"></i>
          <i className="fa-solid fa-gear"></i>
          <div className="relative cart" onClick={handleCart}>
            <i className="fa-solid fa-cart-shopping"></i>
            {cart&&<span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {cart.length}
            </span>}
          </div>
        </div>
      </div>
    </div>
  );
}
