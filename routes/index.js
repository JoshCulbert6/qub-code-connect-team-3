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

module.exports = router;
