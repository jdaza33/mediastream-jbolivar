'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')
const MAX = 3
const MIN = 0

const total = _.sum(
  _.slice(
    _.values(
      _.reduce(
        database,
        (res, val) => {
          _.forEach(val.hats, (hat) => {
            res[hat.id] = res[hat.id] ? res[hat.id] + 1 : 1
          })
          return res
        },
        {}
      )
    ).sort((a, b) => (b > a ? 1 : a > b ? -1 : 0)),
    MIN,
    MAX
  )
)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: Es el tiempo que tarda un algoritmo en finalizar su proceso con respecto a su tamaño de entrada.
 *   - space complexity: Es la cantidad de espacio que toma un algoritmo para ejecutarse con respecto a su tamaño de entrada.
 */
