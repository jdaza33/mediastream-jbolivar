'use strict'

const express = require('express')
const User = require('./models/User')
const { json2csv } = require('json-2-csv')
const fs = require('fs')
const path = require('path')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find({})
      .select({ name: 1, email: 1, _id: 0 })
      .lean()

    json2csv(users, (err, csv) => {
      if (err) next(err)

      const _PATH_ = path.join(__dirname, `csv_${Date.now()}.csv`)
      fs.writeFileSync(_PATH_, csv)
      res.download(_PATH_)
    })
  } catch (error) {
    next(error)
  }
})

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Error')
})

app.listen(3000, () => console.log('Server running on port 3000'))
