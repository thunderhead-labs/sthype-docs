import { useState, useEffect } from 'react';
import { contractStakedToken } from './contracts';

export const useStakedBalance = ({ address }: { address: `0x${string}` }) => {
    const [balance, setBalance] = useState<bigint | null>(0n);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    const fetchBalance = async () => {
        try {
            setIsLoading(true);
            const response: bigint = await contractStakedToken.read.assetsOf([address]) as bigint;
            setBalance(response);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (address) {
            fetchBalance();
        }
    }, [address]);

    return { balance, isLoading, hasError, refetch: fetchBalance };
};

