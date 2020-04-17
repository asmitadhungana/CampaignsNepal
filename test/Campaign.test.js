const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledStore = require("../ethereum/build/CampaignStore.json");

const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let store;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  //call to the CampaignStore contract
  //this format is used whenever we want to deploy a new version of this contract
  store = await new web3.eth.Contract(JSON.parse(compiledStore.interface))
    .deploy({ data: compiledStore.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await store.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  const addresses = await store.methods.getDeployedCampaigns().call();
  campaignAddress = addresses[0];

  //format 2 of calling contract
  //when we've already deployed the contract(which is done by the CampaignStore contract for Campaign contract)
  //and we want to instruct web3 about it's existence by giving the interface of deployed contract
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("deploys a campaignstore and a campaign", () => {
    assert.ok(store.options.address); //assert.ok check for the existence of sth
    assert.ok(campaign.options.address);
  });

  it("marks the caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager); //format: ('what_we_hope_it_is', 'what_it_actually_is')
  });

  it("allows people to contribute money and marks them as contributors", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await campaign.methods
      .contributors(accounts[1])
      .call(); //.call() bcoz we are only  viewing the data and not modifying it
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute.send({
        value: "10",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
