require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const {API_URL_MUMBAI, PRIVATE_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    mumbai: {
      url: API_URL_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    harmonyTestnet: {
      url: "https://api.s0.b.hmny.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    harmonyMainnet: {
      url: "https://api.harmony.one",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
