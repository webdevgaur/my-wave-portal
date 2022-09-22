// const { hexStripZeros } = require("ethers/lib/utils")

const main = async () => {
    const wallets = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log('Contract has been deployed to:', waveContract.address);
    // console.log('Contract deployed by:', owner.address);

    // Fetch wavecount before wave
    let waveCount = await waveContract.getWaveCount();

    // Emulate wave action
    let arrayOfWallets = [];
    let superiorWallets = [];
    let maxCount = 0;

    wallets.forEach(wallet => {
        let thisWallet = {
            signer: wallet,
            waveCount: 0,
        };
        arrayOfWallets.push(thisWallet);
    });

    for (let i = 0; i < arrayOfWallets.length; i++) {
        let randomSeed = Math.floor(Math.random() * arrayOfWallets.length);
        let waveAction = await waveContract.connect(arrayOfWallets[randomSeed].signer).wave();
        await waveAction.wait();
        arrayOfWallets[randomSeed].waveCount += 1;
    }

    arrayOfWallets.forEach( (wallet, index) => {
        if(index > 0) {
            if (wallet.waveCount > maxCount) {
                maxCount = wallet.waveCount;
            }
        } else {
            maxCount = wallet.waveCount;
        }
    });

    console.log('Max count is', maxCount);

    arrayOfWallets.forEach((wallet) => {
        if(wallet.waveCount == maxCount) {
            superiorWallets.push(wallet.signer.address);
            console.log('Is there more than one of me?');
        }
    });

    console.log('The superior wallets are', superiorWallets);
    

    // Check wave count after wave
    waveCount = await waveContract.getWaveCount();

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