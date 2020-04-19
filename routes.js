const routes = require("next-routes")();

routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/:requests", "/campaigns/requests/index"); //':___' part of the url is wildcard | routes.add('if_a_user_goes_to_this_route', 'show_this_page')
//routes.add('campaigns/: paxi_user_goes_to_ath_here_address',  'route_to_this_page')

module.exports = routes;
