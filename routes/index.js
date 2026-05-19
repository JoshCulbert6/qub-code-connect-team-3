var express = require('express');
var router = express.Router();


const EmployeeService = require('../services/employeeService.js');
const employeeService = new EmployeeService();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});









module.exports = router;
