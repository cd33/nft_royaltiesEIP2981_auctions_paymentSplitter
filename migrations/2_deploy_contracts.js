var Payment = artifacts.require("Payment");
var ArkaniaNFT = artifacts.require("ArkaniaNFT");

module.exports = async function (deployer) {
  // Ganache
  // await deployer.deploy(Payment, ["0x53A764A3dAa3Fe404De9c6F1809eCF45546a6889", "0x937b220eeEAE5599D882688fB2eAc62B73d8E03C"], [50, 50]);
  
  // Rinkeby
  await deployer.deploy(Payment, ["0x58165C46208501443eB8a0DbF40799534790176f", "0xe61764c28a6dD0742fE7230D5547902F6475e9BF"], [50, 50]);
  const payment = await Payment.deployed();
  await deployer.deploy(ArkaniaNFT, payment.address); // 0x6201bEcd0bB0C321cf894Ca7F6dD7a7dc5b86AF3
};