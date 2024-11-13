import { getContract, BlockTag } from "viem";
import ABI_STHYPE from "../../abis/stHYPE.json";
import ABI_HYPE from "../../abis/erc20.json";
import ABI_OVERSEER from "../../abis/overseerV1.json";
import { publicClient } from "./config";

export const contractNativeToken = getContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_NATIVE_TOKEN as `0x${string}`,
    abi: ABI_HYPE,
    client: publicClient
});

export const contractStakedToken = getContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_STAKED_TOKEN as `0x${string}`,
    abi: ABI_STHYPE,
    client: publicClient
});

export const contractOverseer = getContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_OVERSEER as `0x${string}`,
    abi: ABI_OVERSEER,
    client: publicClient
});
