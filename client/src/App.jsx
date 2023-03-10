/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";

import { Sidebar, Navbar } from "./components";
import {
  CampaignDetails,
  Campaigns,
  CreateCampaign,
  Home,
  Profile,
  Treasury,
} from "./pages";
// import Treasury from "./pages/Treasury";

const App = () => {
  return (
    // bg-[#13131a]
    <div className="relative sm:-8 p-4 bg-[#0c0b0b] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/campaigns"
            element={<Campaigns />}
          />
          <Route
            path="/treasury"
            element={<Treasury />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/create-campaign"
            element={<CreateCampaign />}
          />
          <Route
            path="/campaign-details/:id"
            element={<CampaignDetails />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
