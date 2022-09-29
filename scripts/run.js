const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.2'),
    });
    await waveContract.deployed();
    console.log("Contract resides at:", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance is:', hre.ethers.utils.formatEther(contractBalance));
  
    let waveCount;
    waveCount = await waveContract.getWaveCount();
    //console.log('Wave count is',waveCount.toNumber());
  
    let waveAction = await waveContract.wave("Message from the first wave");
    await waveAction.wait(); // Wait for the transaction to be mined

    // Wavecount after first wave
    waveCount = await waveContract.getWaveCount();
    console.log('Wave count is',waveCount.toNumber());
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance after first wave:', hre.ethers.utils.formatEther(contractBalance));
  
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveAction = await waveContract.connect(randomPerson).wave("Second wave's message");
    await waveAction.wait(); // Wait for the transaction to be mined

    // Wavecount after second wave
    waveCount = await waveContract.getWaveCount();
    console.log('Wave count is',waveCount.toNumber());
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance after second wave:', hre.ethers.utils.formatEther(contractBalance));

  
    let allWaves = await waveContract.getAllWaves();
    //console.log('Wave count via new variable',allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();