/** @format */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logo, ZeroArmyWhite } from "../assets";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { state } = useLocation();

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <>
      <div>
        <div className="flex items-center justify-center w-full p-12">
          <div className="rounded-lg">
            <img
              className="rounded-full w-[300px] h-[300px] object-cover p-7"
              src={ZeroArmyWhite}
              alt="Zero Army"></img>{" "}
          </div>
          <div className="flex-col items-center">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase p-0">
              Investing in Global Goals. Together.
            </h4>
          </div>
        </div>
        <div className="mt-[20px]">
          <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
            HURA! The Zero Army is a decentralized donation platform that allows
            anyone to "invest" in the global goals. Earn tokens connected to the
            outcome of global goal campaigns.
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
