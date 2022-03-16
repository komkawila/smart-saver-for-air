const express = require('express');
const route = express.Router();

const allRoute = require('./datalog.all');
route.use('/all', allRoute);

const datatimerangeRoute = require('./datalog.datatimerange');
route.use('/datatimerange', datatimerangeRoute);

const rangeRoute = require('./datalog.range');
route.use('/range', rangeRoute);

const dateRoute = require('./datalog.date');
route.use('/date', dateRoute);

const hwRoute = require('./datalog.hw');
route.use('/hw', hwRoute);

module.exports = route;