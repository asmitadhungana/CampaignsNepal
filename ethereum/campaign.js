import web3 from "./web3";
import Campaign from "./build/Campaign.json";

export default (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address); //since we won't have only one instance of Campaign contract deployed to the BC as of CampaignStore
  //we'll have multiple address for multiple campaigns deployed
};
