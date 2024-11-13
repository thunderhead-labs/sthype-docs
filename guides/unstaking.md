

### Unstake (Burn and Redeem)

`overseerV1`

The `burnAndRedeemIfPossible` function is used to burn `stHYPE` tokens and attempt to redeem the underlying staked tokens.

**Function Signature:**

```solidity
function burnAndRedeemIfPossible(address from, string memory communityCode) returns (bool)
```

**Parameters:**
- `from`: The address from which the `stHYPE` tokens will be burned.
- `communityCode`: An identifier representing the community referral code used to track the redemption process.

**Returns:**
- `bool`: A boolean indicating if the redemption was successful.

**Usage:**
The `burnAndRedeemIfPossible` function will burn the `stHYPE` tokens and attempt to redeem the underlying staked tokens if enough tokens are available. If not enough tokens are available, an unstake request will be queued and this will be eligible for redemption when there is a sufficient amount of native tokens in the protocol, unstaked from the validators. Unstake requests have a specific burn ID that can be used to redeem the tokens.

**Important implementation note:**

It is important to show the user the amount of staked tokens which will be instantly unstaked and the amount of staked tokens which will be subject to a unstake request. This can be calculated using the following logic. Please bear in mind that this should be refreshed often to ensure the user knows the latest state.

```javascript
async function calculateUnstake(inputAmount: bigint) {
    // Fetch the maximum amount that can be instantly unstaked
    const instantlyBurnableAmount = await contractOverseer.read.maxRedeemable();

    // Initialize unstake amounts
    let instantUnstakeAmount = 0n;
    let unstakeRequestAmount = 0n;

    // Determine the unstake strategy (instant unstake, unstake request or both)
    if (instantlyBurnableAmount < inputAmount) {
        instantUnstakeAmount = instantlyBurnableAmount;
        unstakeRequestAmount = inputAmount - instantlyBurnableAmount;
    } else {
        instantUnstakeAmount = inputAmount;
    }

    // Return the calculated values
    return {
        instantUnstakeAmount,
        unstakeRequestAmount,
    };
}
```

### Redeem (Redeem Unstake Request)

`overseerV1`

The `redeem` function is used to redeem the underlying staked tokens using a specific burn ID.

**Function Signature:**

```solidity
function redeem(uint256 burnId) nonpayable
```

**Parameters:**
- `burnId`: A `uint256` identifier for the specific burn transaction that you want to redeem.

**Returns:**
- None

**Usage:**
To use the `redeem` function, you call it with the `burnId` of the burn transaction you wish to redeem. This function does not return any values and does not accept Ether. It is important to ensure that the burn transaction is eligible for redemption before calling this function.

## Retrieving Unstake Requests

### Overview

In the `stHYPE` protocol, users can track their unstake requests using the `getBurns` function to retrieve information about your unstake requests.

#### Get Burns

The `getBurns` function provides detailed information about each burn request associated with a specific account.

**Function Signature:**

```solidity
function getBurns(address account) view returns (tuple[], uint256[], bool[])
```

**Parameters:**
- `account`: The address of the account for which you want to retrieve burn details.

**Returns:**
- `tuple[]`: An array of `BurnItem` structures, where each `BurnItem` contains the following fields:
  - `amount`: `uint256` - The amount of tokens involved in the burn request.
  - `userAddress`: `address` - The address of the user who initiated the burn request.
  - `completionStatus`: `bool` - A boolean indicating whether the burn request has been completed.
  - `sum`: `uint256` - The total sum associated with the burn request.
- `uint256[]`: Additional data related to the burns.
- `bool[]`: An array indicating the completion status of each burn request.

**Usage:**
Use this function to get detailed information about each unstake request, including whether it has been completed.

