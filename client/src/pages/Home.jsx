/** @format */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logo, ZeroArmyWhite } from "../assets";

import { useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();

  return (
    <>
      <div>
        <div className="flex items-center justify-center w-full p-12">
          <div className="rounded-full bg-[#2c2f32]">
            <img
              className="rounded-full w-[333px] h-[333px] object-cover p-7"
              src={ZeroArmyWhite}
              alt="Zero Army"></img>{" "}
          </div>
          <div className="flex-col items-center bg-[#2c2f32] rounded-lg justify-center">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase p-3">
              Investing in Global Goals. Together.
            </h4>
          </div>
        </div>
        <div className="mt-[20px]">
          <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
            HURA! The Zero Army is a decentralized donation platform that allows
            anyone to "invest" in the global goals. Earn tokens connected to the
            outcome of global goal campaigns. Tokens also have utility value
            within the Zero Army ecosystem**. <br /> These tokens will
            eventually be integrated into a special Zero Army Metaverse
            (MetaSERVE) simulation. The MetaSERVE will feature real-time
            visualizations of the impact that donations have on the global goals
            within an interactive videogame-like environment. <br /> <br />
            ** NOTE: The Zero Army maintains a "zero expectations" policy with
            respect to Returns On Donations (ROD). The Zero Army is a DONATION
            PLATFORM first and foremost. Tokens are a bonus. Donors should
            donate with zero expecations of financial gain.
            <br />
            <br /> <b>Disclaimer:</b> <br />
            Nothing on this site constitutes professional and/or financial
            advice. We are not financial advisors. We are a global community of
            people who believe in the power of the global goals and the power of
            the people to make them happen. We are the Zero Army.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
