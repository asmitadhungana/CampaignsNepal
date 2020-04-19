import web3 from "./web3";
import CampaignStore from "./build/CampaignStore.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignStore.interface),
  "0xAbCa6922661bE0E7862858281c0b2FAb94122625"
);

export default instance;
