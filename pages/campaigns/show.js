import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class ShowCampaign extends Component {
  static async getInitialProps(props) {
    //address of the campaign that the user's trying to view by clicking "Show Campaign" in the main page is passed here as props in props.query.address | this was done through routing in routes.js
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address, //this is the address of the current campaign that is showing
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      contributorsCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      contributorsCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "manager's address",
        description: "The manager is the person who created this campaign ",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: "This is the least amount of money to be a contributor",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request is created to withdraw money from a campaign. A request has to be approved by at least 50% of the total Contributors to get accepted. ",
      },
      {
        header: contributorsCount,
        meta: "Number of donators",
        description:
          "This many people have already donated to this campaign. Donate for a purpose!",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is the amount of money left in the campaign to spend",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h2>Campaign Show</h2>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary> View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ShowCampaign;
