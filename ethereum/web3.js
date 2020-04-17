import Web3 from "web3";

//const web3 = new Web3(window.web3.currentProvider);   NOT A VALID CODE WHILE ASSUMING NOT ALL OF OUR USERS HAVE METAMASK  PRE-INSTALLED IN THEIR BROWSER

let web3;

//checking to see if we're on server or browser
//in server(NEXTjs), node is used and it has no window object in it(undef)
if (typeof window != "undefined" && typeof window.web3 != "undefined") {
  //We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //We are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/4d5ebec5432f4f559690e1091210c6c1"
  );
  web3 = new Web3(provider);
}

export default web3;
