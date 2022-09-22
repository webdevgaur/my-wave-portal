// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import 'hardhat/console.sol';

contract WavePortal {
    uint256 totalWaves = 0;
    constructor() {
        console.log('Smart contract works.');
    }

    function wave() public {
        totalWaves += 1;
        console.log('Wave recieved from ', msg.sender);
    }

    function getWaveCount() public view returns(uint256) {
        console.log('Total number of waves is', totalWaves);
        return totalWaves;
    }
}