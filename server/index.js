const bodyParser = require('body-parser')
const express = require('express')
const mongodb = require('mongodb')
const pathToRegexp = require('path-to-regexp')
const morgan = require('morgan')

const mongoUri = 'mongodb://localhost:27017/usDebt'

const app = express()

app.use(bodyParser.json())

app.use(morgan('combined'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/api/states', (req, res) => {
  db.collection('states').find()
    .toArray((err, states) => {
      res.send(states)
    })
})

app.post('/api/states', (req, res) => {
  const state = Object.assign({}, req.body)
  db.collection('states')
    .insert(state, (err, result) => {
      if (err) return console.log(err)
      res.json(result)
    })
})

app.get('/api/states/:_id', (req, res) => {
  const objectId = mongodb.ObjectID(req.params['_id'])
  db.collection('states')
    .findOne({ '_id': objectId }, (err, state) => {
      res.json(state)
    })
})

app.put('/api/states/:_id', (req, res) => {
  const objectId = mongodb.ObjectID(req.params['_id'])
  let state = Object.assign({}, req.body)
  delete state._id
  db.collection('states')
    .update({ '_id': objectId }, state, (err, result) => {
      if (err) return console.log(err)
      res.json(result)
    })
})

app.delete('/api/states/:_id', (req, res) => {
  const objectId = mongodb.ObjectID(req.params['_id'])
  db.collection('states')
    .remove({ '_id': objectId }, (err, result) => {
      if (err) return console.log(err)
      res.json(result)
    })
})

mongodb.MongoClient.connect(mongoUri, (err, database) => {
  if (err) return console.log(err)
  console.log('Connected to database: ' + mongoUri)
  db = database
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
  })
})
