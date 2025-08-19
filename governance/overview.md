# Overview

We value decentralized governance. However, the vanilla governance token model often creates a situation where the economic security by the governance token does not exceed the TVL of the protocol, thus creating an attack vector. We have a legislative <> executive governance design to prevent this:

* **Legislative**:
  * The actor that proposes new governance additions, protocol upgrades, and operator onboarding is controlled by a multisig that is composed of members of the Thunderhead team as well as other members of the community. When a new transaction is proposed, it must first be approved by this multisig before it gets put up to the protocol for voting
* **Executive**
  * This is the system that approves proposals proposed by the legislative branch, and it is simply a weighted popular vote of **stHYPE token holders**. So, if a malicious proposal is created, the users of stHYPE have the complete power to veto the proposal. All proposals are considered optimistic and there must be a certain total number of tokens votes as well as a consensus percentage by the token holders to veto.

This system will go fully live post Hyperliquid pre-compiles.&#x20;
