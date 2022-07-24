const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const ZPDVerifier = await hre.ethers.getContractFactory("ZeroPartyDataVerifier")
  const zpdVerifier = await ZPDVerifier.deploy();
  await zpdVerifier.deployed();
  console.log("ZeroPartyDataVerifier Contract deployed to:", zpdVerifier.address);

  const ZPD = await hre.ethers.getContractFactory("ZeroPartyData")
  const zpd = await ZPD.deploy(zpdVerifier.address);
  await zpdVerifier.deployed();
  console.log("ZeroPartyData Contract deployed to:", zpd.address);

     /* this code writes the contract addresses to a local */
   /* file named config.js that we can use in the app */
   fs.writeFileSync('./config.js', `
   export const contractAddress = "${zpd.address}"
   export const ownerAddress = "${zpd.signer.address}"
   `)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
