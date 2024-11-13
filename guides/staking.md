# stHYPE Integration - Staking

## Mint (Staking)

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

## Staked Token Balance (including rewards)

`overseerV1`

Since stHYPE is yield bearing, the `assetsOf` function must be used to retrieve the total staked asset balance associated with a specific account. This stHYPE amount includes any rewards that have been accrued.

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

