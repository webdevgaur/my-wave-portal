const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract resides at:", waveContract.address);
  
    let waveCount;
    waveCount = await waveContract.getWaveCount();
    console.log('Wave count is',waveCount.toNumber());
  
    let waveAction = await waveContract.wave("A message!");
    await waveAction.wait(); // Wait for the transaction to be mined
  
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveAction = await waveContract.connect(randomPerson).wave("Another message!");
    await waveAction.wait(); // Wait for the transaction to be mined
  
    let allWaves = await waveContract.getAllWaves();
    console.log('Wave count via new variable',allWaves);
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