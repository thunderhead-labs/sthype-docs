---
description: >-
  This document provides information required for stHYPE to appear as a
  white-labeled staking option on your platform’s staking page.
hidden: true
---

# White Label

## stHYPE x Your Platform

### **User Flow**

Users will view a stHYPE modal on your platform's staking interface, branded to align with your platform’s aesthetic. They select an amount of HYPE to stake and submit a transaction.

stHYPE is yield-bearing, meaning the value of 1 stHYPE increases over time as the underlying validators earn rewards. When a user decides to unstake, they’ll receive more HYPE than originally deposited. Users can view their rewards on a chart, with updates each block.

When unstaking, users have two options: sell their stHYPE on a decentralized exchange (DEX) for instant liquidity or enter the unstaking queue.

#### Minting

To mint stHYPE, call `mint(address to, string community)` on the stHYPE Overseer contract, with `msg.value` reflecting the user’s selected stake amount. The user receives their stHYPE, and `community` is set to your platform’s identifier.

Stakes tagged to your platform are delegated to its validator, benefiting both your platform and users by providing liquidity and DeFi options.

#### Unstaking

To unstake, users may choose to sell via a DEX aggregator or call `burn(uint256 amount, address to)`.  After the unstaking period, users call `redeem(uint256 id)`.

### **Benefits**

1. Users on your platform can view their staked assets in their EVM wallets and watch rewards accrue.
2. Users gain liquidity through DeFi and can potentially earn additional rewards.
3. Users can sell their LST on a DEX to unstake immediately, bypassing lengthy protocol unbonding periods.
4. Your platform benefits from all stHYPE delegations tagged to it.
5. Delegations to your platform increase proportionally to its contribution within the general pool.
6. General liquidity and awareness for stHYPE grow, strengthening the Hyperliquid ecosystem, benefiting Thunderhead and other community stakeholders.
