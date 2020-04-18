import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import store from "../ethereum/store";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  //We do the data loading in this fxn of Nextjs(server-side rendering)
  static async getInitialProps() {
    const campaigns = await store.methods.getDeployedCampaigns().call();

    return { campaigns: campaigns }; //this object [arr of addresses] is provided to our component as props
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>Show Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>Open Campaigns</h1>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create New Campaign"
                icon="add circle"
                primary={true}
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
