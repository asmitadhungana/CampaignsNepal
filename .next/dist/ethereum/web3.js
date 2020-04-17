"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require("web3");

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const web3 = new Web3(window.web3.currentProvider);   NOT A VALID CODE WHILE ASSUMING NOT ALL OF OUR USERS HAVE METAMASK  PRE-INSTALLED IN THEIR BROWSER

var web3 = void 0;

//checking to see if we're on server or browser
//in server(NEXTjs), node is used and it has no window object in it(undef)
if (typeof window != "undefined" && typeof window.web3 != "undefined") {
  //We are in the browser and metamask is running
  web3 = new _web2.default(window.web3.currentProvider);
} else {
  //We are on the server OR the user is not running metamask
  var provider = new _web2.default.providers.HttpProvider("https://rinkeby.infura.io/v3/4d5ebec5432f4f559690e1091210c6c1");
  web3 = new _web2.default(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtXFx3ZWIzLmpzIl0sIm5hbWVzIjpbIldlYjMiLCJ3ZWIzIiwid2luZG93IiwiY3VycmVudFByb3ZpZGVyIiwicHJvdmlkZXIiLCJwcm92aWRlcnMiLCJIdHRwUHJvdmlkZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU8sQUFBUDs7Ozs7O0FBRUE7O0FBRUEsSUFBSSxZQUFKOztBQUVBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sQUFBUCxVQUFpQixBQUFqQixlQUFnQyxPQUFPLE9BQU8sQUFBZCxRQUFzQixBQUExRCxhQUF1RSxBQUNyRTtBQUNBO1NBQU8sQUFBSSxBQUFKLGtCQUFTLE9BQU8sQUFBUCxLQUFZLEFBQXJCLEFBQVAsQUFDRDtBQUhELE9BR08sQUFDTDtBQUNBO01BQU0sV0FBVyxJQUFJLGNBQUssQUFBTCxVQUFlLEFBQW5CLGFBQ2YsQUFEZSxBQUFqQixBQUdBO1NBQU8sQUFBSSxBQUFKLGtCQUFTLEFBQVQsQUFBUCxBQUNEO0FBRUQ7O2tCQUFlLEFBQWYiLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiJIOi9ibG9ja0NoYWluL2Z1bmRyYWlzZXIifQ==