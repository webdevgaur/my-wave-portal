const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
    console.log("Contract resides at:", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('Contract balance is:', hre.ethers.utils.formatEther(contractBalance));
    
    let waveAction = await waveContract.wave("Message from the first wave");
    await waveAction.wait(); // Wait for the transaction to be mined

    waveAction = await waveContract.wave("Message from the second wave");
    await waveAction.wait(); // Wait for the transaction to be mined

    // contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    // console.log('Contract balance after first wave:', hre.ethers.utils.formatEther(contractBalance));
  
    // const [_,
    //   randomPerson1,
    //   randomPerson2,
    //   randomPerson3,
    //   randomPerson4,
    //   randomPerson5,
    //   randomPerson6,
    //   randomPerson7,    
    //  ] = await hre.ethers.getSigners();
    // waveAction = await waveContract.connect(randomPerson1).wave("Second wave's message");
    // await waveAction.wait(); // Wait for the transaction to be mined

    // waveAction = await waveContract.connect(randomPerson2).wave("Third wave's message");
    // await waveAction.wait(); // Wait for the transaction to be mined

    // waveAction = await waveContract.connect(randomPerson3).wave("Fourth wave's message");
    // await waveAction.wait(); // Wait for the transaction to be mined
    
    // waveAction = await waveContract.connect(randomPerson4).wave("Fifth wave's message");
    // await waveAction.wait(); // Wait for the transaction to be mined
    
    // waveAction = await waveContract.connect(randomPerson5).wave("Sixth wave's message");
    // await waveAction.wait(); // Wait for the transaction to be mined
    
    // waveAction = await waveContract.connect(randomPerson6).wave("Seventh wave's message");
    // await waveAction.wait(); // Wait for the transaction to be mined
    
    // waveAction = await waveContract.connect(randomPerson7).wave("Eighth wave's message");
    // await waveAction.wait(); // Wait for the transaction to be mined

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