const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log('Contract is being deployed from', deployer.address);
    console.log('Account balance is', accountBalance.toString());

    const wavePortalFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await wavePortalFactory.deploy();
    await waveContract.deployed();

    console.log('Wave Portal address', waveContract.address);
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