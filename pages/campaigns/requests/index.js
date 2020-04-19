import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query; //get the "address" part from our url (route)
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const contributorsCount = await campaign.methods.contributorsCount().call();

    //Since solidity doesn't yet return whole Arrays with nested structs inside it, we're retrieving the requests one by one using getRequestsCounts which gives the length of requests to retrive them through their indices
    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        }) //eg: Array(5).fill() gives us 5 indices to fill the request and map() iterates through each of them individually
    );

    return { address, requests, requestCount, contributorsCount };
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          contributorsCount={this.props.contributorsCount}
        />
      );
    });
  }

  state = {};
  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Requests</h3>

        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="left" style={{ marginBottom: 10 }}>
              Add Requests
            </Button>
          </a>
        </Link>
        <Table size="small" celled selectable>
          <Header>
            <Row>
              <HeaderCell> ID </HeaderCell>
              <HeaderCell> Description </HeaderCell>
              <HeaderCell>Amount </HeaderCell>
              <HeaderCell>Recipient </HeaderCell>
              <HeaderCell> Approval Count</HeaderCell>
              <HeaderCell> Approve</HeaderCell>
              <HeaderCell> Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests</div>
      </Layout>
    );
  }
}

export default RequestIndex;
