var {Promise} = require('es6-promise')
var request = require('axios')

module.exports = function(config) {
  return new Promise(async function(resolve, reject) {
    try {
      var response = await request.get('http://localhost:3000/api/pandas')
      resolve({
        pandas: response.data.pandas,
        title: 'isormophic sweetness'
      })
    } catch(err) {
      reject(err)
    }
  })
}

