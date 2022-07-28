import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import FormCard from "../components/formCard";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <span className="mb-10 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 ">
          Zero Party Data
        </span>
      </div>
       {/* <div className="flex items-center justify-center">
        <GameCard nameGame="Sudoku" imageGame={sudokuImage} urlGame="/sudoku" />
      </div> */}
       <div className="flex items-center justify-center">
        <FormCard urlGame="/zeroPartyData" />
      </div> 
    </div>
  );
}
