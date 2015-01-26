var React = require('react')
var Router = require('react-router')
var routes = require('../isomorphic/components/routes')
var {Promise} = require('es6-promise')
var merge = require('lodash-node/modern/objects/merge')
require('regenerator/runtime.js')

function routePromiseFactory(params) {
  return function(route) {
    return new Promise(async function(resolve, reject) {
      try {
        var result = await route.handler.fetchData({}, params)
        resolve(result)
      } catch(err) {
        reject({errors: {[route.name]: err}})
      }
    })
  }
}

function fetchData(routes, params) {
  return new Promise(async function(resolve, reject) {
    var routesWithFetchData = routes.filter((route) => {
      return route.handler.fetchData
    })

    var promises = routesWithFetchData.map(routePromiseFactory(params))

    try {
      var result = merge.apply({errors:{}},await Promise.all(promises.map((promise) => {
        return new Promise((resolve, reject) => {
          // Do something fancier later?
          promise.then(resolve).catch(resolve)
        })
      })))
      resolve(result)
    } catch(err) {
      reject(err)
    }
  })
}

var initialRun = true

function go() {

  Router.run(routes, Router.HistoryLocation, async function(Handler, state) {

    if(initialRun) {
      data = initialProps
    } else {
      console.log('you blinked')
      var data = await fetchData(state.routes, state.params)
    }

    if(data.errors) {
      Object.keys(data.errors).forEach((key) => {
        // TODO: Show message and object itself without message
        console.error(data.errors[key])
        if(data.errors[key].status === 404) {
          data.title = data.errors[key].message
        }
      })
    }

    initialRun = false

    document.title = data.title

    React.render((
      <Handler {...data} />
    ), document.getElementById('application'))
  })
}

setTimeout(go, 30)

