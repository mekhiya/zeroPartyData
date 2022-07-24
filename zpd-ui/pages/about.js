import Head from "next/head";
import GoBack from "../components/goBack";

export default function About() {
  return (
    <div>
      <Head>
        <title>zeroPartData - About</title>
        <meta name="title" content="zeroPartyData - About" />
        <meta name="description" content="Zero Party Data with Zero Knowledge - About" />
      </Head>
      <div className="mb-10">
        <GoBack />
      </div>
      <div className="grid place-items-center">
        <div className="flex justify-center items-center mb-10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
          zeroPartyData
        </div>
        <div className="flex justify-center items-center text-lg md:w-96 w-auto text-slate-300">
        zeroPartData project uses Zero Knowledge Proof to verify eligibility for gifts & discount offers by Brands.
        </div>
      </div>
    </div>
  );
}