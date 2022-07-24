import { exportCallDataGroth16 } from "../snarkjsZkproof";

export async function zpdCalldata(workType, age, income, workTypeEligiblity, ageEligiblity, incomeEligiblity) {
  const input = {
    workType: workType,
    age: age,
    income: income,
    workTypeEligiblity: workTypeEligiblity,
    ageEligiblity: ageEligiblity,
    incomeEligiblity: incomeEligiblity
  };

  let dataResult;

  try {
    dataResult = await exportCallDataGroth16(
      input,
      "/zkproof/zeroPartyData.wasm",
      "/zkproof/zeroPartyData_final.zkey"
    );
  } catch (error) {
    // console.log(error);
    window.alert("Wrong answer");
  }

  return dataResult;
}
