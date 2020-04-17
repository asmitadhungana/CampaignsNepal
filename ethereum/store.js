import web3 from "./web3";
import CampaignStore from "./build/CampaignStore.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignStore.interface),
  "0x72355dF6F2cBEAF62F227D02A9496c6f2fb663C9"
);

export default instance;
