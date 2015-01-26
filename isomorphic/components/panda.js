var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler

var Panda = React.createClass({

  displayName: 'Panda',

  statics: {
    fetchData: require('../controllers/panda')
  },

  render: function() {
    return (
      <div>
        <h1>{this.props.pandas.name}</h1>
        <img className="panda-large" src={this.props.pandas.img} />
      </div>
    )
  }

})

module.exports = Panda
