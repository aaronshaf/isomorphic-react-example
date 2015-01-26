var React = require('react')
var Router = require('react-router')
var routes = require('../../isomorphic/components/routes')
var {Promise} = require('es6-promise')
var merge = require('lodash-node/modern/objects/merge')

function routePromiseFactory(req, params) {
  return function(route) {
    return new Promise(async function(resolve, reject) {
      var config = { apiHost: 'http://' + req.get('host') }
      try {
        var result = await route.handler.fetchData(config, params)
        resolve(result)
      } catch(err) {
        reject({errors: {[route.name]: err}})
      }
    })
  }
}

function fetchData(req, routes, params) {
  return new Promise(async function(resolve, reject) {
    var routesWithFetchData = routes.filter((route) => {
      return route.handler.fetchData
    })

    var promises = routesWithFetchData.map(routePromiseFactory(req, params))

    try {
      var result = merge.apply({errors:{}},await Promise.all(promises.map((promise) => {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve)
        })
      })))
      resolve(result)
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = function(req, res) {
  Router.run(routes, req.path, function(Handler, state) {
    fetchData(req, state.routes, state.params).then((data) => {
      // TODO: find out why this line is necessary
      if(!data.errors) data.errors = {}

      var status = Object.keys(data.errors).reduce(function(status, key) {
        var error = data.errors[key]
        return error.status && error.status > status ? error.status : status
      },200)

      Object.keys(data.errors).forEach((key) => {
        if(data.errors[key].status === 404) {
          data.title = data.errors[key].message
        }
      })

      var applicationHtml = React.renderToString(
        <Handler {...data} />
      )

      res.status(status).render('main.ejs', {
        applicationHtml,
        data
      })
    }).catch((err) => {
      req.log.error(err,'Error when rendering React.js components')
      res.status(500).send('Error rendering :-(')
    })
  })
}
