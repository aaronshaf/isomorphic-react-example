var React = require('react')
var {Link, RouteHandler} = require('react-router')

var Panda = React.createClass({

  displayName: 'Front',

  statics: {
    fetchData: require('../controllers/app')
  },

  render: function() {
    var pandas = this.props.pandas.map(function(panda) {
      return (
        <div key={panda.name}>
          <h2>{panda.name}</h2>
          <Link to="panda" params={{panda_id: panda.id}}>
            <img className="panda-small" src={panda.img} />
          </Link>
        </div>
      )
    })

    return (
      <div>
        <h1>Pandas</h1>
        <div>
          <Link to="reddit">Reddit listings</Link>
        </div>
        {pandas}
        <RouteHandler {...this.props} />
      </div>
    )
  }

})

module.exports = Panda

