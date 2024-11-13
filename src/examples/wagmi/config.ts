import { createAppKit } from '@reown/appkit/react'
import { cookieStorage, createStorage, createConfig } from 'wagmi'
import { mainnet, Chain } from '@reown/appkit/networks'
import { createPublicClient, createWalletClient, http, webSocket, custom, defineChain, hexToBigInt, defineBlock } from "viem";
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

let activeChains: Chain[] = [];
export let activeChain: Chain = mainnet;

const RPC_URL = process.env.NEXT_PUBLIC_RPC_PROVIDER as string;

export const hyperliquid_testnet = defineChain({
    id: 998,
    name: 'Hyperliquid Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ["https://api.hyperliquid-testnet.xyz/evm"] },
    },
    blockExplorers: {
        default: {
            name: "HyperEVM testnet explorer",
            url: "https://explorer.hyperlend.finance/"
        }
    },
})

activeChains = [hyperliquid_testnet];
activeChain = hyperliquid_testnet;
export const networks = [hyperliquid_testnet];

const transportTest = http('https://api.hyperliquid-testnet.xyz/evm', {
    onFetchRequest(request: any) {
        console.log('request', request)
    }
})


export const walletClient = createWalletClient({
    chain: activeChain,
    transport: http(RPC_URL),
})

export const publicClient = createPublicClient({
    chain: activeChain,
    transport: http(RPC_URL)
})

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string

export const wagmiAdapter = new WagmiAdapter({
    networks: networks,
    transports: {
        [hyperliquid_testnet.id]: transportTest,
    },
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    //...wagmiOptions // Optional - Override createConfig parameters
})

export const config = wagmiAdapter.wagmiConfig
