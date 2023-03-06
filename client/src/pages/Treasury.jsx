/** @format */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";

const Treasury = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { state } = useLocation();
  const [treasuryBalance, setTreasuryBalance] = useState(0);

  const { address, contract, getCampaigns, getTreasuryBalance } =
    useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
      //   let balance = getTreasuryBalance();
      //   setTreasuryBalance(balance);
    }
  }, [address, contract]);

  return (
    <>
      <div>
        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
          Treasury
        </h4>

        <div className="mt-[20px]">
          <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
            {treasuryBalance}
          </p>
        </div>
      </div>
    </>
  );
};

export default Treasury;
