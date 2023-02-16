/** @format */

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

import { StateContextProvider } from "./context";
import TMDapp from "./index";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <StateContextProvider>
        {/* <Component {...pageProps} /> */}
        <TMDapp />
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
