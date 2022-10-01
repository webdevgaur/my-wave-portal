// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import 'hardhat/console.sol';

contract WavePortal {
    
    uint256 totalWaves = 0;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);
    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
    }
    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log('Smart contract third iteration.');
        seed = (block.timestamp + block.difficulty)%100;
        console.log('Random seed at genesis is:', seed);
    }


    function wave(string memory _message) public {
        require(
            lastWavedAt[msg.sender] + 5 minutes < block.timestamp,
            "Waves need to be separated by 5 minutes."
        );
        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        console.log('Wave recieved from %s with message %s', msg.sender, _message);
        waves.push(Wave(msg.sender, block.timestamp, _message));

        seed = (block.timestamp + block.difficulty + seed) % 100;
        console.log('Randomly generate seed for new wave:', seed);

        if(seed < 50) {
            console.log('Congratulations! %s you have won!', msg.sender);
            uint256 prizeAmount = 0.001 ether;
            require(
                prizeAmount <= address(this).balance,
                'Unfortunately, we are out of funds! :('
            );
            (bool success,) = (msg.sender).call{value: prizeAmount}("");
            require(success, 'Unexpected failure. Cannot withdraw money from the contract.');
        }    

        emit NewWave(msg.sender, block.timestamp, _message);        
    }

    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }

    function getWaveCount() public view returns(uint256) {
        console.log('Total number of waves is', totalWaves);
        return totalWaves;
    }
}