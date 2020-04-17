import React, { Component } from "react";
import store from "../ethereum/store";
import { Card } from "semantic-ui-react";

class CampaignIndex extends Component {
  //We do the data loading in this fxn of Nextjs(server-side rendering)
  static async getInitialProps() {
    const campaigns = await store.methods.getDeployedCampaigns().call();

    return { campaigns: campaigns }; //this object [arr of addresses] is provided to our component as props
  }

  render() {
    return <div>{this.props.campaigns[0]}</div>;
  }
}

export default CampaignIndex;
