var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler

var App = React.createClass({

  displayName: 'App',

  render: function() {
    return (
      <RouteHandler {...this.props} />
    )
  }

})

module.exports = App
