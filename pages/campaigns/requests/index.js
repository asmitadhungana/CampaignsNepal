import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query; //get the "address" part from our url (route)
    return { address };
  }
  state = {};
  render() {
    return (
      <Layout>
        <h3>Requests</h3>

        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Requests</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
