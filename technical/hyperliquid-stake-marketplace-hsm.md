---
description: >-
  This page outlines the specification for the HIP-3 Hyperliquid Stake
  Marketplace
---

# Hyperliquid Stake Marketplace (HSM)

## Overview

HIP-3 is a features that allows large stakers to [provision](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals) their own perpetual markets. HSM allows for a coincidence-of-wants; large stakers wanting to earn extra yield and support the ecosystem can allocate their stake to builders who want to provision markets, but do not have the \~$40m+ HYPE required.&#x20;

HIP-3 is still in the early stages of implementation. Thus, as the spec improves, the HSM spec will adjust as well.&#x20;

## Technical Overview

At a high level, HSM is middleware that conducts a Harberger-esque auction on the rights to use a certain amount of staked hype. HSM aims to pareto optimize a) rewards to end users by ensuring the stake is allocated to the highest performing market any given time b) builder experience by ensuring they have time to build traction on their market and by providing easy capitalization requirements. Initially, HSM will start with curation by the Thunderhead team; however, as the number of HIP-3 deployers increases, the market will become fully permissionless and tranching will be introduced.&#x20;

## Design Properties

### Minimal Risk

Mitigating risk is top of mind. Prior to the market becoming permissionless, all actors and their markets will be heavily vetted in order to avoid potential slashing. Hyperliquid has not yet released information at how slashing will occur for HIP-3. We expect slashing to be extremely rare and only in egregious, malicious circumstances which are easily avoidable with public oversight.&#x20;

### Open Access

HSM should allow as many builders and stakers to benefit as possible. This of course must be counter-balanced with risk mitigation. Eventually, we aim for HSM to be fully permissionless for anyone to benefit from.&#x20;

### Optimal Builder Experience

HSM should have the easiest possible developer experience. We want teams outside of the Hyperliquid ecosystem to easily be able to use the marketplace. This is how we grow the pie and get Hyperliquid everywhere.&#x20;

### Maximal Rewards

HSM should be the best possible place for end users to earn additional rewards from HIP-3.&#x20;

### Ecosystem Aligned

HSM is aligned with the Hyperliquid protocol's goals. Namely, increasing volume, fees, and users for the platform while maintaining high standards, taste, and security.&#x20;

## Auction (Phase 1)

stHYPE currently has 11m HYPE staked. A tunable buffer amount will be left un-utilized in HIP-3 to avoid a subset of the builders having a surprise wind-down event of their market. The HIP-3 spec does not yet specify the formula for stake required for a given number of markets.&#x20;

Every interval, initially 1 month, HIP-3 builders will blindly submit their market proposal. Their proposal will include a detailed documentation outlining what asset they will list, the oracles used, and the risk mitigations in place. The proposal will also include an offer of HYPE for the 1 mo term and/or percentage revenue share of the market. HSM operators will decide on the markets that maximize returns while mitigating risk.&#x20;

Once a market is selected, proposals will enter the public forum for scrutiny. If no issues are found, then the stake will be allocated and the market will commence. Fees will be passed through to stHYPE holders.&#x20;

Depending on the market price of the HIP-3 auction, stHYPE may use pool rewards to purchase deployment spots to maximize builder appeal and future rewards for stakers.&#x20;

## Dual-Tranching Model (Phase 2)

As the initial mechanism becomes battle-tested, HSM will enter its second phase of a permisionless order book platform. Any builder can upload their market proposal onchain. Users can then decide if they want to allocate themselves based on risk, upfront fee, and revenue share.&#x20;

### Universal

The auction mechanism for the general pool will stay as is.&#x20;

### Permisionless

Users will be able to deposit stake into the permissionless section of HSM and enter their tolerances onchain. Builder participation in this section is permissionless. This portion will work similar to community codes.&#x20;

