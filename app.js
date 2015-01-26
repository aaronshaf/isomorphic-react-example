require('6to5/register')({
  experimental: true
})
require("6to5/polyfill")

var PORT = process.env.PORT || 3000

const express = require('express')
const app = express()

app.engine('ejs', require('ejs').__express)
app.use('/api',require('./api/routes'))
app.use('/assets',express.static(__dirname + '/assets'))
app.use(require('./api/middleware/isomorphic-react'))

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT)
})
