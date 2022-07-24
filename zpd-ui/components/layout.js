import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import Script from "next/script";
import { WagmiConfig, createClient } from "wagmi";
import { providers } from "ethers";

import networks from "../utils/networks.json";

// Provider that will be used when no wallet is connected (aka no signer)
const provider = providers.getDefaultProvider(
  networks[networks.selectedChain].rpcUrls[0]
);

console.log("Provider are")
console.log(provider)
console.log("networks[networks.selectedChain].rpcUrls[0] is ");
console.log(networks[networks.selectedChain].rpcUrls[0])
const client = createClient({
  autoConnect: true,
  provider,
});
console.log("client is ");
console.log(client.connectors);
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>zeroPartyData</title>
        <meta name="title" content="zeroPartyData" />
        <meta name="description" content="Zero Party Data with Zero Knowledge" />
        <meta name="theme-color" content="#ea580c" />
      </Head>
      <WagmiConfig client={client}>
        <div className="flex flex-col min-h-screen px-2 bg-slate-900 text-slate-300">
          <Header />
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </WagmiConfig>
    </>
  );
}