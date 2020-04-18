import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head"; //for getting the semantic-ui css cdn link to get inside head tag of the html rendered (check in chrome console!)
import Header from "./Header";

export default (props) => {
  return (
    <div>
      <Container>
        <Head>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>
        <Header />
        {props.children}
      </Container>
    </div>
  );
};
