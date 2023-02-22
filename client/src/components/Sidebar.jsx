/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun, zarmy100x100, zarmy50x50 } from "../assets";
import { navlinks } from "../constants";
import "../index.css";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}>
    {!isActive ? (
      <img
        src={imgUrl}
        alt="fund_logo"
        className="w-1/2 h-1/2"
      />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <div className="w-[106px] h-[106px] bg-[#2c2f32] rounded-full flex justify-center items-center cursor-pointer">
          <img
            className="opacity-95 rounded-full justify-center object-contain" // bg-[#2c2f32]
            src={zarmy100x100}
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={sun}
        />
      </div>
    </div>
  );
};

export default Sidebar;
