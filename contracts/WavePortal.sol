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

    constructor() payable {
        console.log('Smart contract third iteration.');
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log('Wave recieved from %s with message %s', msg.sender, _message);
        waves.push(Wave(msg.sender, block.timestamp, _message));
        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.001 ether;
        require(
            prizeAmount <= address(this).balance,
            'Unfortunately, we are out of funds! :('
        );
        (bool success,) = (msg.sender).call{value: prizeAmount}("");
        require(success, 'Unexpected failure. Cannot withdraw money from the contract.');
    }

    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }

    function getWaveCount() public view returns(uint256) {
        console.log('Total number of waves is', totalWaves);
        return totalWaves;
    }
}