var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();

// Create a new employee form
router.get('/add', (req, res) => {
  res.render('addEmployee');
});

// Create a new employee submit
router.post('/add', (req, res) => {
  const newEmployee = req.body;
  const createdEmployee = employeeService.createEmployee(newEmployee);
  res.redirect('/employees/' + createdUser.id)
});
