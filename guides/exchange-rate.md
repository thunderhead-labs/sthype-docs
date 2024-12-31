# Exchange Rate

Yield-bearing liquid staking tokens (like **stHYPE**) are designed to accrue rewards or interest over time. 
Unlike regular tokens, which maintain a fixed ratio of the underlying asset, yield-bearing tokens can grow in value or represent an increasing claim on the underlying asset. 

The current stHYPE / HYPE exchange rate can be derived by performing an on-chain call to the **stHYPE** contract:

1. Call `assetsToShares` with an input amount to get an output amount

   ```
   const outputAmount = await contractStakedToken.read.assetsToShares([inputAmount])
   ```

2. Compute the rate by dividing the original input by the output:

```
const rate = outputAmount
    ? Number(inputValueWeb3Num.bigI) / Number(outputAmount)
    : 0;
```

Note you might want to regularly refresh this request (every 30 seconds for example) to reflect the latest on-chain state.
