import { useSimulateContract, useWriteContract, useBalance } from "wagmi";
import { waitForTransactionReceipt } from '@wagmi/core'
import { WaitForTransactionReceiptReturnType } from "viem"
import { useEffect, useState } from 'react';
import ABI from "../../abis/overseerV1.json";
import { useAccount } from "wagmi";
import { config } from "./config"

const useUnstake = (
    inputAmount: bigint,
    approved: boolean,
    postUnstakeCallback: any,
    communityCode: string = '',
) => {
    const { address, chain } = useAccount();
    const [pending, setPending] = useState(false);
    const [pendingTx, setPendingTx] = useState<any>(null);
    const [confirmedTx, setConfirmedTx] = useState<null | WaitForTransactionReceiptReturnType>(null);
    const [signTxPending, setSignTxPending] = useState<any>(false);
    const [pendingTxHash, setPendingTxHash] = useState<any>(null);

    const args = [
        address,
        inputAmount,
        communityCode
    ];

    const configBurn = {
        address: process.env.NEXT_PUBLIC_CONTRACT_OVERSEER as `0x${string}`,
        abi: ABI,
        functionName: 'burnAndRedeemIfPossible',
        args,
    }

    const { data: simulateData, error: simulateError } = useSimulateContract(configBurn);

    const { data, writeContract, isPending, isError, isSuccess } = useWriteContract({
        mutation: {
            onSuccess: async (txHash) => {
                setPending(true);
                setPendingTxHash(txHash);
                setSignTxPending(false);
                const transactionReceipt = await waitForTransactionReceipt(config, {
                    hash: txHash,
                });
                setPending(false);
                setConfirmedTx(transactionReceipt);
                setPendingTxHash(null);
                postUnstakeCallback();
            },
            onError(error: Error) {
                console.log('debug unstake error', error);
                setSignTxPending(false);
                setPendingTxHash(null);
            }
        }
    });

    const resetState = () => {
        setConfirmedTx(null);
        setPending(false);
        setPendingTx(null);
        setSignTxPending(false);
    };

    const sendTransaction = () => {
        console.log('useUnstake sendTransaction');
        if (writeContract) {
            writeContract(configBurn);
        } else {
            console.log('useUnstake error', isError);
            console.log('useUnstake write', writeContract);
            console.log('useUnstake isSuccess', isSuccess);
            console.log('useUnstake isLoading', isPending);
            console.log('useUnstake data', data);
            console.log('useUnstake simulateData', simulateData);
            console.log('useUnstake args', args);
        }
    }

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
    }
};

export default useUnstake;
