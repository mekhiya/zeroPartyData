import React, { useEffect, useState } from "react";
import Head from "next/head";
import GoBack from "../components/goBack";


import {
  useAccount,
  useConnect,
  useContract,
  useProvider,
  useSigner,
  useContractEvent,
  useNetwork,
} from "wagmi";

import networks from "../utils/networks.json";

//import { sudokuCalldata } from "../zkproof/sudoku/snarkjsSudoku";
import { zpdCalldata, zPDCalldata } from "../zkproof/zeroPartyData/snarkjsZPD";
import contractAddress from "../utils/contractaddress.json";
//import sudokuContractAbi from "../utils/abiFiles/Sudoku.json";
import zPDContractAbi from "../utils/abiFiles/ZeroPartyData.json";


export default function ZeroPartyData() {

    const [workType,setWorkType] = useState(0);
    const [age,setAge] = useState(18);
    const [income,setIncome] = useState(5000);
    
    const [workTypeEligiblity,SetWorkTypeEligiblity] = useState(1);
    const [ageEligiblity,SetAgeEligiblity] = useState(18);
    const [incomeEligiblity,SetIncomeEligiblity] = useState(5000);

  
  const { data: dataAccount } = useAccount();
  const { activeChain } = useNetwork();

  const [loadingVerifyBtn, setLoadingVerifyBtn] = useState(false);
  const [loadingVerifyAndMintBtn, setLoadingVerifyAndMintBtn] = useState(false);

  const { data: signer } = useSigner();

  const provider = useProvider();

  const contract = useContract({
    addressOrName: contractAddress.zPDContract,
    contractInterface: zPDContractAbi.abi,
    signerOrProvider: signer || provider,
  });

  const contractNoSigner = useContract({
    addressOrName: contractAddress.zPDContract,
    contractInterface: zPDContractAbi.abi,
    signerOrProvider: provider,
  });

  const calculateProof = async () => {
    setLoadingVerifyBtn(true);
    console.log("Start calldata");
    console.log(workType, age, income, workTypeEligiblity, ageEligiblity, incomeEligiblity);
    let calldata = await zpdCalldata(workType, age, income, workTypeEligiblity, ageEligiblity, incomeEligiblity);

    console.log("Done Calldata");
    console.log(calldata);
    
    if (!calldata) {
      setLoadingVerifyBtn(false);
      return "Invalid inputs to generate witness.";
    }


    try {
      let result;

      console.log("dataAccount");
      console.log(dataAccount);
      console.log("activeChain");
      console.log(activeChain);
      console.log("networks.selectedChain");
      console.log(networks.selectedChain);

      if (
        dataAccount?.address &&
        activeChain.id.toString() === networks.selectedChain
      ) {
        result = await contract.verifyUsingGroth(
          calldata.a,
          calldata.b,
          calldata.c,
          calldata.Input
        );
      } else {
        result = await contractNoSigner.verifyUsingGroth(
          calldata.a,
          calldata.b,
          calldata.c,
          calldata.Input
        );
      }
      console.log("result", result);
      setLoadingVerifyBtn(false);
      alert("Successfully verified");
    } catch (error) {
      setLoadingVerifyBtn(false);
      console.log(error);
      alert("Wrong solution");
    }
  };

  const verifyZPD = async () => {
    console.log("Address", dataAccount?.address);
    calculateProof();
  };
  

  useEffect(() => {
    console.log("Sudoku page");

  }, []);
  return (
    <div>
      <Head>
        <title>zkSudoku</title>
        <meta name="title" content="zkSudoku" />
        <meta name="description" content="Zero Knowledge Sudoku Games" />
      </Head>
      <div className="mb-10">
        <GoBack />
      </div>
      <div className="flex  items-center justify-center">
        <div className="mx-5 mb-10 text-3xl font-bold text-transparent bg-clip-text
         bg-gradient-to-r from-sky-500 to-emerald-500 ">
          ZeroPartyData
        </div>
      </div>
      <div className="flex items-center justify-center mb-10">
      <label className="px-2">Work Type</label>
      </div>
      <div className="flex items-center justify-center mb-10">
      <label className="px-2">Work Type</label>
        <select
          onChange={(e) => setWorkType(e.target.value || null)}
          className="flex items-center justify-center px-5 py-3 space-x-3 text-lg text-white
                font-medium rounded-md bg-gradient-to-r from-sky-600 to-emerald-600
                bg-sky-600 bg-clip-padding bg-no-repeat
                hover:from-sky-500 hover:to-emerald-500"
          value={workType || ""}
        >
          <option value=""></option>
          <option value="0">Business Owner</option>
          <option value="1">Salaried Employee</option>
        </select>
      </div>
      <div className="flex items-center justify-center mb-10">
        {/* {renderSudoku()} */}
          <label className="px-2">Age</label>
          <input
            value={age}
            type="text"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(e) => setAge(Number(e.target.value ?? 0))}
            w="100px"
            className="flex items-center justify-center px-5 py-3 space-x-3 text-lg 
              font-medium rounded-md  bg-gradient-to-r from-sky-600 to-emerald-600
              hover:from-sky-500 hover:to-emerald-500"/>
          </div>
          <div className="flex  items-center justify-center mb-10">
          <label className="px-2">Income</label>
            <input
              value={income}
              type="text"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              //disabled={!dataAccount}
              onChange={(e) => setIncome(Number(e.target.value ?? 0))}
              w="140px"
              className="flex items-center justify-center px-5 py-3 space-x-3 text-lg 
                font-medium rounded-md bg-gradient-to-r from-sky-600 to-emerald-600
                hover:from-sky-500 hover:to-emerald-500"/>
                </div>
                <div className="flex  items-center justify-center mb-10">
          <button
              className="flex items-center justify-center px-5 py-3 space-x-3 text-lg
                font-medium rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 
                hover:from-sky-500 hover:to-emerald-500"
              onClick={verifyZPD}>Call Verify</button>
        
      </div>
      <div className="flex  items-center justify-center mb-10">
        <div className="md:w-6/12">
          <div className="my-5 font-semibold text-center">ZeroPartyData:</div>
          <div className="space-y-5">
            <p>
              <span className="font-semibold">ZeroPartyData</span> (also known as
              &quot;ZPD&quot;) zeroPartyData uses zero knowledge proof to verify eligibility
               for gifts & discount offers by Brands..
            </p>
            <ul className="pl-5 space-y-2 list-disc">
              <li>
                Fill Work Type, Age, Income in above form. Generate Proof to 
                verify on-chain. If all 3 criteria are true, proof is true, 
                new discount offer will be provided by brand.
              </li>
              <li>
                Present Example : if &quot;work type is = Salaried&quot; . AND if &quot;Age = 18+&quot; 
                AND if &quot;income = 5000+&quot; all 3 criterias OK. 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}