var React = require('react')
var Router = require('react-router')
var Route = Router.Route
var NotFoundRoute = Router.NotFoundRoute
var DefaultRoute = Router.DefaultRoute
var Link = Router.Link

var App = require('./app')
var Panda = require('./panda')
var Reddit = require('./reddit')
var Front = require('./front')

module.exports = (
  <Route name="application" path="/" handler={App}>
    <Route name="panda" path="/panda/:panda_id" handler={Panda} />
    <Route name="reddit" path="/reddit" handler={Reddit} />

    <DefaultRoute name="front" handler={Front}/>
  </Route>
)
