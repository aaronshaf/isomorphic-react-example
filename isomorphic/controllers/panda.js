var {Promise} = require('es6-promise')
var request = require('axios')

module.exports = function(config, params) {
  return new Promise(async function(resolve, reject) {
    try {
      var response = await request.get('http://localhost:3000/api/pandas/' + params.panda_id)
      resolve({
        pandas: response.data.pandas,
        title: response.data.pandas.name
      })
    } catch(err) {
      reject(err)
    }
  })
}
