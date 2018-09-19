let express = require('express');

let storeRoutes = require('./store');

module.exports =
  express.Router()
    .get('/', async function(req, res) {
      res.render('index', { title: 'Express' });
    })
    .use('/store', storeRoutes);