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
  res.redirect('/employees/' + createdEmployee.id);
});

// Read all users
router.get('/', (req, res) => {
  const employees = employeeService.getAllEmployees();
  res.render('employees', { employees: employees })
});

// Read a user by ID
router.get('/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('employee', { employee: employee })
});

// Update a user by ID form
router.get('/update/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('updateEmployee', {employee: employee});
});

module.exports = router;