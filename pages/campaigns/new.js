import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import store from "../../ethereum/store";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class NewCampaign extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  //it'll call createCampaign() fxn from our C.Store contract through store.js file
  onSubmit = async (event) => {
    event.preventDefault();

    //show a loader while processing
    this.setState({ loading: true, errorMessage: "" });

    //check for errors while form submissions
    try {
      const accounts = await web3.eth.getAccounts();
      await store.methods.createCampaign(this.state.minimumContribution).send({
        from: accounts[0],
      });
      //Successfully created a new Campaign contract
      //Redirect the user to our Campaign Index page
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    //hide the loader after finished (this loading is a prop of Button component of semantic-ui-react)
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h1>Create a new Campaign</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
