var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService.js');
const employeeService = new EmployeeService();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/employees",  async (req, res) =>{
  const readEmployees = await employeeService.readEmployees();
  if(!readEmployees) return res.status(404).send('No employees to show');
  res.render('employees', { employees: readEmployees });
});

router.get('/delete/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('deleteEmployee', {employee: employee})
});

router.post('/delete/:id', (req, res) => {
  const deletedEmployee = employeeService.deleteEmployee(parseInt(req.params.id));
  if (!deletedEmployee) return res.status(404).send('Employee not found');
  res.redirect('/employees')
});


router.get('/update/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('updateEmployee', {employee: employee})
});

// Update a user by ID
router.post('/update/:id', (req, res) => {
  const updatedEmployee = employeeService.updateEmployee(parseInt(req.params.id), req.body);
  if (!updatedEmployee) return res.status(404).send('Employee not found');
  res.redirect('/users/' + updatedEmployee.id)
});



module.exports = router;
