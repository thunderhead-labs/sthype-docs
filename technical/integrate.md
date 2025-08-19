---
description: >-
  How to integrate staking and unstaking stHYPE on your frontend or from smart
  contracts.
---

# Integrate

{% hint style="info" %}
Reference our **integration** [**Github**](https://github.com/thunderhead-labs/sthype-docs) **repo** for ABIs, frontend examples and guides.
{% endhint %}

{% hint style="danger" %}
If you are a DeFi protocol interacting with StakedHYPE contracts, PLEASE familiarize yourself with the [relationship](wsthype.md) between stHYPE/wstHYPE.&#x20;
{% endhint %}

### Minting (Staking)

1. Send a transaction to  the overseer with the function signature `mint(address to, uint256 communityCode)(uint256)` , which returns the amount of StakedHYPE (as of right now this will always be the same amount as minted). There is also another function signature `mint(address to)` that is callable if you do not have a community code to stake to. The `to` address is the address the stHYPE tokens will be minted to and the `communityCode` is the code representing the validator you want those tokens to be designated too. **The amount minted will be the amount of HYPE included in the value of the transaction**. There is no onchain Community Code validation - please ensure you are using the right one.&#x20;
2. This will mint stHYPE to the user.

```solidity
function Example_Mint() public {
    address user = address(0x1234);
    vm.deal(user, 10 ether);

    vm.startPrank(user); // using the private key of the user
    uint256 mintedShares = overseer.mint{value: 10 ether}(user, "<validator code>"); // mint 10 stHYPE
    
    overseet.mint{value: 10 ether}(user); // mint another 10 stHYPE to user
}
```

### Community Codes

These will be whitelisted in a public, transparent offchain indexer for governance approved validators. This index was originally onchain prior to the Hyperliquid gas/s updates.&#x20;

These are passed as a param to the staking and unstaking functions in order to track HYPE flow and rewards throughout the ecosystem.

### Burning (Unstaking)

Burning is has the _potential_ to be a multistep process depending on the amount of free (unstaked) tokens available in the protocol. There will typically always be a small float of the total supply unstaked in order to instantly fulfill burns, but if it is the burn of a large amount of tokens or there is high outflow volume steps become a two-step process. You can access the amount of free tokens (if a burn has less than this amount it will be processed atomically) by calling `maxRedeemable()`

1. Approve the overseer with the amount of stHYPE tokens that you want to unstake.
2. Call `burnAndRedeemIfPossible(address to, uint256 amount, string communityCode)` to burn `amount` of tokens from `communityCode` the redeemed HYPE will go to the `to` address. Note: if you do not want to burn from a community code leave the field a blank string (""). `maxRedeemable()` of these tokens will be burned instantly and sent to the `to` address, and the rest will be processed in a burn request. This function returns the `burnID` which will be used to redeem the burn once it has been finished.
3. If this was a large burn or there was not enough tokens, wait some time until `redeemable(uint256 burnID` is `true`
4. Call `redeem(uint256 burnID)` which will send the pending HYPE to the `to` address specified in the previous transaction

```solidity
function Example_Burn() public {
    uint256 decimals = 10 ** 18;

    address user = address(0x1234); // set up with a balance of 10 stHYPE
    vm.startPrank(user);
    
    // 1. approve 10 stHYPE (18 decimals)
    sthype.approve(overseer, 10 * decimals); 

    // 2. redeem the max amount of tokens instantly available
    uint256 maxRedeemable = overseer.maxRedeemable(); // 5 HYPE
    uint256 burnID = overseer.burnAndRedeemIfPossible(address(user), 10 ether, "<validator code>");
    require(address(user).balance = 5 ether, "user should have 5 hype now");
    
    // 3. wait some time
    
    // ...
    
    // 4. redeem the burn for the rest of the tokens
    overseer.redeem(burnID);
    require(address(user).balance = 10, "user should have all of their hype now");
}
```
