# stHYPE Integration - Balances

## Fetching Staked Token Balance (Including Rewards)

`stHYPE`

The `assetsOf` function is essential for retrieving the total staked asset balance associated with a specific account. This balance includes any rewards that have been accrued, making it a comprehensive view of the user's holdings within the protocol.

**Function Signature:**

```solidity
function assetsOf(address account) view returns (uint256)
```

**Parameters:**
- `account`: The address of the account for which you want to retrieve the asset balance.

**Returns:**
- `uint256`: The total amount of assets held by the specified account, including rewards.

**Usage:**
To use the `assetsOf` function, call it with the address of the account you are interested in. This function will return the total assets associated with that account, allowing you to track the account's holdings and rewards within the protocol.

**Note** 

`balanceOf` will give the just the underlying token balance.

