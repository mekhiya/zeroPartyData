import { groth16 } from "snarkjs";

export async function exportCallDataGroth16(input, wasmPath, zkeyPath) {
  
  console.log("FIrst step exportCallDataGroth16");
  console.log("input");
  console.log(input);
  console.log("wasmPath");
  console.log(wasmPath);
  console.log("zkeyPath");
  console.log(zkeyPath);


  const { proof: _proof, publicSignals: _publicSignals } =
    await groth16.fullProve(input, wasmPath, zkeyPath);

  const calldata = await groth16.exportSolidityCallData(_proof, _publicSignals);

  
  console.log("second step exportCallDataGroth16");
  console.log("_publicSignals");
  console.log(_publicSignals);
  console.log("_proof");
  console.log(_proof);

  const argv = calldata
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map((x) => BigInt(x).toString());

  const a = [argv[0], argv[1]];
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ];
  const c = [argv[6], argv[7]];
  const Input = [];

  for (let i = 8; i < argv.length; i++) {
    Input.push(argv[i]);
  }

  return { a, b, c, Input };
}
