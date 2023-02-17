/** @format */

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

import { StateContextProvider } from "./context";
import { Sidebar, Navbar } from "./components";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ children }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <StateContextProvider>
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>

          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Navbar />
            {/* <h1 className="text-2xl text-white">INDEX MAIN</h1> */}
            {/* <Routes>
          <Route
            path="/"
            element={<Home />}
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
          </Routes> */}
          </div>
          {children}
        </div>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
