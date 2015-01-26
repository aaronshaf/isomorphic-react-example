var {Promise} = require('es6-promise')
var request = require('axios')

module.exports = function(config) {
  return new Promise(async function(resolve, reject) {
    try {
      var response = await request.get('http://www.reddit.com/r/javascript.json')
      resolve({
        redditListings: response.data.data.children,
        title: 'reddit listings'
      })
    } catch(err) {
      reject(err)
    }
  })
}
