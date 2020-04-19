"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require("./web3");

var _web2 = _interopRequireDefault(_web);

var _CampaignStore = require("./build/CampaignStore.json");

var _CampaignStore2 = _interopRequireDefault(_CampaignStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = new _web2.default.eth.Contract(JSON.parse(_CampaignStore2.default.interface), "0xAbCa6922661bE0E7862858281c0b2FAb94122625");

exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtXFxzdG9yZS5qcyJdLCJuYW1lcyI6WyJ3ZWIzIiwiQ2FtcGFpZ25TdG9yZSIsImluc3RhbmNlIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU8sQUFBUCxBQUFpQixBQUFqQjs7OztBQUNBLEFBQU8sQUFBUCxBQUEwQixBQUExQjs7Ozs7O0FBRUEsSUFBTSxXQUFXLElBQUksY0FBSyxBQUFMLElBQVMsQUFBYixTQUNmLEtBQUssQUFBTCxNQUFXLHdCQUFjLEFBQXpCLEFBRGUsWUFFZixBQUZlLEFBQWpCLEFBS0E7O2tCQUFlLEFBQWYiLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiSDovYmxvY2tDaGFpbi9mdW5kcmFpc2VyIn0=