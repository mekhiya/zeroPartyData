import {
    WagmiConfig,
    createClient,
    defaultChains,
    configureChains,
  } from 'wagmi'
  
  import { alchemyProvider } from 'wagmi/providers/alchemy'
  import { publicProvider } from 'wagmi/providers/public'
  
  import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
  import { InjectedConnector } from 'wagmi/connectors/injected'
  import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
  import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
  
  //const alchemyId = process.env.ALCHEMY_ID
  const alchemyId = "https://polygon-mumbai.g.alchemy.com/v2/kwDkVGahinYBakz22FjbxKTvQ0LWmNrS"
  
  // Configure chains & providers with the Alchemy provider.
  // Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
  const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    alchemyProvider({ alchemyId }),
    publicProvider(),
  ])
  
  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  })
  
  // Pass client to React Context Provider
  function App() {
    return (
      <WagmiConfig client={client}>
        <Profile />
      </WagmiConfig>
    )
  }