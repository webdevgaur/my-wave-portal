// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import 'hardhat/console.sol';

contract WavePortal {
    
    uint256 totalWaves = 0;
    event NewWave(address indexed from, uint256 timestamp, string message);
    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
    }
    Wave[] waves;

    constructor() {
        console.log('Smart contract second iteration.');
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log('Wave recieved from %s with message %s', msg.sender, _message);
    }

    function getWaveCount() public view returns(uint256) {
        console.log('Total number of waves is', totalWaves);
        return totalWaves;
    }
}