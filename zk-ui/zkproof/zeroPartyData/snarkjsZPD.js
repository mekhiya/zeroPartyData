import { exportCallDataGroth16 } from "../snarkjsZkproof";

export async function zpdCalldata(_workType, _age, _income, _workTypeEligible, _ageEligible, _incomeEligible) {
  const input = {
    workType: _workType,
    age: _age,
    income: _income,
    workTypeEligible: _workTypeEligible,
    ageEligible: _ageEligible,
    incomeEligible: _incomeEligible
  };

  console.log("zpdCalldata starts");

  let dataResult;

  try {
    console.log("Noting inpt");
    console.log(input);
    dataResult = await exportCallDataGroth16(
      input,
      "/zkproof/zeroPartyData.wasm",
      "/zkproof/zeroPartyData_final.zkey"
    );
  } catch (error) {
    // console.log(error);
    window.alert("You are not eligible for offer. Not sending your proof to Verifier");
  }

  return dataResult;
}
