/**
 * @format
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    localhost: {},
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "*", // Match any network id
    // },
    // goerli: {
    //   url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    // },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
    // mumbai: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`]
    // },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },
};
