# stHYPE Integration

## Overview

Welcome to the `stHYPE` integration repository. This project is designed to help developers integrate `stHYPE`, into their applications. The repository provides examples and configurations for interacting with the solidity smart contracts directly and provides some frontend code examples to aid in development speed and logic. 

## Key Functions

### Mint (Staking)

`overseerV1`

The `mint` function is used to stake tokens and receive `stHYPE` in return. This function allows users to lock their tokens in the staking contract and mint an equivalent amount of `stHYPE`, which represents their staked position within the protocol. 

**Function Signature:**

```solidity
function mint(address to, string memory communityCode) payable returns (uint256)
```

**Parameters:**
- `to`: The address to which the minted `stHYPE` tokens will be sent.
- `communityCode`: An identifier representing the community referral code used to track the minting process.

**Returns:**
- `uint256`: The amount of `stHYPE` tokens minted.

**Usage:**
To use the `mint` function, you need to send a transaction with the appropriate amount of native HYPE tokens to the contract, specifying the recipient address and the community code. This will lock the tokens in the staking contract and mint `stHYPE` tokens to the specified address. stHYPE tokens will then automatically earn hyperliquid protocol rewards.

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

## Staked Token Balance

`overseerV1`

The `assetsOf` function is used to retrieve the total staked asset balance associated with a specific account. This stHYPE amount includes any rewards that have been accrued.

**Function Signature:**

```solidity
function assetsOf(address account) view returns (uint256)
```

**Parameters:**
- `account`: The address of the account for which you want to retrieve the asset balance.

**Returns:**
- `uint256`: The total amount of assets held by the specified account.

**Usage:**
To use the `assetsOf` function, call it with the address of the account you are interested in. This function will return the total assets associated with that account, allowing you to track the account's holdings within the protocol.

