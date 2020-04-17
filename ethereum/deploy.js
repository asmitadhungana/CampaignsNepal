const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledStore = require("./build/CampaignStore.json");

const provider = new HDWalletProvider(
  "hurry heavy obtain dice saddle waste grit cook fragile doctor educate fancy",
  "https://rinkeby.infura.io/v3/4d5ebec5432f4f559690e1091210c6c1"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledStore.interface)
  )
    .deploy({ data: "0x" + compiledStore.bytecode })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
