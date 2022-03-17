var Payment = artifacts.require("Payment");
var ArkaniaNFT = artifacts.require("ArkaniaNFT");

module.exports = async function (deployer) {
  // Ganache
  // await deployer.deploy(Payment, ["0x53A764A3dAa3Fe404De9c6F1809eCF45546a6889", "0x937b220eeEAE5599D882688fB2eAc62B73d8E03C"], [50, 50]);
  
  // Rinkeby
  await deployer.deploy(Payment, ["0xdB4D6160532835f8Be98f3682eD165D5Ce02ECf9", "0xD9453F5E2696604703076835496F81c3753C3Bb3"], [50, 50]);
  const payment = await Payment.deployed();
  await deployer.deploy(ArkaniaNFT, payment.address);
};