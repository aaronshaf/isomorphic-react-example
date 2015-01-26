var React = require('react')
var {RouteHandler} = require('react-router')

var Reddit = React.createClass({

  displayName: 'Reddit',

  statics: {
    fetchData: require('../controllers/reddit')
  },

  render: function() {
    var listings = this.props.redditListings && this.props.redditListings.map(function(listing) {
      return (
        <li key={listing.data.url}>
          <a href={listing.data.url}>{listing.data.title}</a>
        </li>
      )
    })

    return (
      <div>
        <h1>reddit listings</h1>
        <ul>
          {listings}
        </ul>
      </div>
    )
  }

})

module.exports = Reddit

