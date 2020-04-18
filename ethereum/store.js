import web3 from "./web3";
import CampaignStore from "./build/CampaignStore.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignStore.interface),
  "0x0544B5B837a099457811442CAD37Bc379cbd8243"
);

export default instance;
