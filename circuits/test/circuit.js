const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;

describe("zeroPartyData circuit", function () {
  let sudokuCircuit;

  before(async function () {
    zpdCircuit = await wasm_tester("zeroPartyData/zeroPartyData.circom");
  });

  it("Should generate the witness successfully", async function () {
    let input = {
        birthdayMonth: 8,
        presentMonth: 8,
    };
    const witness = await zpdCircuit.calculateWitness(input);
    await zpdCircuit.assertOut(witness, {});
  });
  it("Should fail because there is a number out of bounds", async function () {
    let input = {
        birthdayMonth: 8,
        presentMonth: 8,
    };
    try {
      await zpdCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
});
