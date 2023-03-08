/** @format */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
        <div>
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Investing in Global Goals. Together.
          </h4>
        </div>
        <div className="mt-[20px]">
          <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
            HURA! The Zero Army is a decentralized donation platform that allows
            anyone to "invest" in the global goals. Earn tokens connected to the
            outcome of global goal campaigns. If a global goal campaign is
            successful, then the value of tokens earned through the Zero Army's
            Tokenized Mass Donation (TMD) systems, may increase in value. Hence,
            a positive Return On Donation (ROD) may be possible. These tokens
            will also be useful within the Zero Army's Metaverse - codenamed:
            the MetaSERVE. <br />
            <br />
            <b>Note:</b> If a global goal campaign fails, the value of tokens
            may be worth zero but that's our baseline expectation. Donations
            have always run the risk of ZERO Returns On Donation (ROD). <br />
            <br /> <b>Disclaimer:</b> <br />
            Nothing on this site constitutes professional and/or financial
            advice, nor does any information constitute a comprehensive or
            complete statement of the matters discussed or the law relating
            thereto. The Zero Army maintains a "Zero Expectations" policy with
            respect to Returns On Donations(ROD). Tokens are a bonus, not a
            gaurantee of ROD. Donors should onl give as much as they are willing
            to donate with ZERO expecation of ROD. We are not financial
            advisors. We are a global community of people who believe in the
            power of the global goals and the power of the people to make them
            happen. We are the Zero Army.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
