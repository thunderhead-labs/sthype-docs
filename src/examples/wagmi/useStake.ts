import { useSimulateContract, useWriteContract, UseWriteContractReturnType, useAccount } from "wagmi";
import { waitForTransactionReceipt } from '@wagmi/core'
import { encodeFunctionData, WaitForTransactionReceiptReturnType } from "viem"
import { useEffect, useState } from 'react';
import ABI from "../../abis/overseerV1.json";
import { config } from "./config"

export type SwapOutputState = {
  inputAmount: bigint;
  outputAmount: bigint;
  outputAmountMinReceived: bigint;
};

const useStake = (
    inputAmount: bigint,
    communityCode: string = '',
    mutation: any,
) => {
    const { address, chain } = useAccount();
    const [pending, setPending] = useState(false);
    const [pendingTx, setPendingTx] = useState<any>(null);
    const [confirmedTx, setConfirmedTx] = useState<null | WaitForTransactionReceiptReturnType>(null);
    const [signTxPending, setSignTxPending] = useState<any>(false);
    const [pendingTxHash, setPendingTxHash] = useState<any>(null);
    const [lastSwap, setLastSwap] = useState<SwapOutputState | null>(null);
    const [swapOutputState, setSwapOutputState] = useState<SwapOutputState | null>(null);

    const args = [
        address,
        inputAmount,
        communityCode,
    ];

    const configMint = {
        address: process.env.NEXT_PUBLIC_CONTRACT_OVERSEER as `0x${string}`,
        abi: ABI,
        functionName: 'mint',
        args,
    }

    const { data: simulateData, error: simulateError } = useSimulateContract(configMint);

    const { data, writeContract, isPending, isError, isSuccess } = useWriteContract({
        mutation,
    });

    const resetState = () => {
        setConfirmedTx(null);
        setPending(false);
        setPendingTx(null);
        setSignTxPending(false);
        setLastSwap(null);
    };

    const sendTransaction = () => {
        console.log('useMinterToStake sendTransaction');
        if (writeContract) {
            writeContract(configMint);
        } else {
            console.log('useMinterToStake error', isError);
        }
    }

    useEffect(() => {
        setSwapOutputState({
            inputAmount: inputAmount,
            outputAmount: inputAmount,
            outputAmountMinReceived: inputAmount
        });
    }, [inputAmount]);

    return {
        sendTransaction,
        pending,
        pendingTx,
        confirmedTx,
        resetState,
        isLoading: isPending,
        transaction: data,
        signTxPending,
        pendingTxHash,
        lastSwap,
        swapOutputState,
    }
};

export default useStake;
