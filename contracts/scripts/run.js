const main = async () => {
    const ZPDVerifier = await hre.ethers.getContractFactory("ZeroPartyDataVerifier")
    const zpdVerifier = await ZPDVerifier.deploy();
    await zpdVerifier.deployed();
    console.log("ZeroPartyDataVerifier Contract deployed to:", zpdVerifier.address);

    const ZPD = await hre.ethers.getContractFactory("ZeroPartyData")
    const zpd = await ZPD.deploy(zpdVerifier.address);
    await zpdVerifier.deployed();
    console.log("ZeroPartyData Contract deployed to:", zpd.address);

    //uint256[8] calldata _proof,
    //uint256[2] calldata _input
  
    // let proof =[
    //  ["0x23a5d47e9c7b37cb3a1f35ba68b082ffc3dd4ce03461976b9457874c02779066", "0x259266d1ef8c13518d637a7480b3b8575e5f37e479629d6b16e0c4aee202c617"],
    // [["0x080485ab3f3901999e451404e709330cef16389980e17cdbbe637dc55f0d6c34", "0x30573345b9e885c73300c06d743c924ec86b16945bc372577d1a9469048feba8"],["0x2cecf97ac3ea2633187b793259bf7556f64bf79513d64bca229909fb156ba8ac", "0x0e111c26ab19e7251f3f71242a7434783e41517647cc3e1de6ed27d6c0922bdb"]],
    // ["0x084549340ee36474beea48448a01778a6927621db12b8676cbe9eb3f9c4c52ee", "0x014bd6ef937250dfd72817966130bc76b3f352e6b0bfa5390e7d1dfb9015c8ae"],
    // ];
    // let input = ["0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000012","0x0000000000000000000000000000000000000000000000000000000000001388"];

     let callZPD = [
         ["0x23a5d47e9c7b37cb3a1f35ba68b082ffc3dd4ce03461976b9457874c02779066", "0x259266d1ef8c13518d637a7480b3b8575e5f37e479629d6b16e0c4aee202c617"],
         [["0x080485ab3f3901999e451404e709330cef16389980e17cdbbe637dc55f0d6c34", "0x30573345b9e885c73300c06d743c924ec86b16945bc372577d1a9469048feba8"],["0x2cecf97ac3ea2633187b793259bf7556f64bf79513d64bca229909fb156ba8ac", "0x0e111c26ab19e7251f3f71242a7434783e41517647cc3e1de6ed27d6c0922bdb"]],
         ["0x084549340ee36474beea48448a01778a6927621db12b8676cbe9eb3f9c4c52ee", "0x014bd6ef937250dfd72817966130bc76b3f352e6b0bfa5390e7d1dfb9015c8ae"],
         ["0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000012","0x0000000000000000000000000000000000000000000000000000000000001388"]
     ];
    
    console.log("Calling VerifyProof Now");
    // Call the function.
    let result = await zpdVerifier.verifyProof(
        callZPD[0],
        callZPD[1],
        callZPD[2],
        callZPD[3]);
  
    console.log("Result", result);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
  