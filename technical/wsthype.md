---
description: Pioneering a new, more efficient token model.
---

# wstHYPE

## Summary

Liquid staking tokens are typically faced with a dilemma: whether or not they should pick rebasing or yield-bearing LST.&#x20;

#### Rebasing

* [Amazing](https://t.me/chainflip_io_chat/121821) and easy to understand user experience
* Require wrapping into a separate token for DeFi compatibility
* Deemed a "Mind Virus" by Sam Kazemian due to painful DeFi interactions

#### Yield-Bearing

* Painful for users to understand: "Why am I immediately losing money!?!"
* Very easy to integrate into DeFi

What if we could get the best of both worlds? With stHYPE you can!

## wstHYPE Contract Address

0x94e8396e0869c9F2200760aF0621aFd240E1CF38

[https://purrsec.com/address/0x94e8396e0869c9f2200760af0621afd240e1cf38](https://purrsec.com/address/0x94e8396e0869c9f2200760af0621afd240e1cf38)

### Implementation

For stakedhype, we have stHYPE and wstHYPE simultaneously! The Overseer mints/burns from the stHYPE token contract. wstHYPE reads the share balances from the stHYPE contract and has admin transfer rights to manipulate the balances.

Ultimately, rebasing and yield-bearing are just different representations of the same thing. Yield-bearing tokens display a share value which represent a portion of total supply. Rebasing tokens perform the multiplication to show you how much your shares are worth.&#x20;

wstHYPE and stHYPE are just different interfaces to interact with the same data. This means that when you transfer/mint/burn stHYPE, it will perform the same action for wstHYPE. Users and DeFi protocols can interact with both interfaces seamlessly without wrapping, allowing users and DeFi protocols alike to have an easy UX!

### Caveats <a href="#caveats" id="caveats"></a>

{% hint style="danger" %}
This dual-token model introduces a significant vulnerability for certain DeFi integrations. It is very simple to mitigate! Be Wary!
{% endhint %}

These types of multi-entrypoint tokens have caused issues in the past. Please read this vulnerabilty [report](https://medium.com/chainsecurity/trueusd-compound-vulnerability-bc5b696d29e2) of another protocol for more information.&#x20;

Contracts and EOAs can self disable their transfer functionality by calling `setSelfDisableTransfer(bool status)`on either stHYPE or wstHYPE. This function is also callable by governance.&#x20;
