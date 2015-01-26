var pandas = require('../../data/pandas.json')

module.exports = function(req, res) {
  return res.json({pandas})
}

