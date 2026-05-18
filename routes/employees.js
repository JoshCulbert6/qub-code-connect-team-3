var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService');
const employeeService = new EmployeeService();

//validation
function validateEmployee(req, res, next) {
  const { name, position, salary } = req.body;

  if (!name || !position || salary === undefined) {
    return res.redirect('employees/add?error=required');
  }

  const parsedSalary = Number(salary);
  if (isNaN(parsedSalary)) {
    return res.redirect('employees/add?error=required');
  }

  if (parsedSalary <= 0) {
    return res.redirect('employees/add?error=required');
  }

  req.body.salary = parsedSalary;
  next();
};

// Create a new employee form
router.get('/add', (req, res) => {
  res.render('addEmployee');
});

// Create a new employee submit
router.post('/add',  (req, res) => {
  const newEmployee = req.body;
  const createdEmployee = employeeService.createEmployee(newEmployee);
  res.redirect('/employees/' + createdEmployee.id + '?success=true');
});

// Read all employees
router.get('/', (req, res) => {
  const employees = employeeService.getAllEmployees();
  res.render('employees', { employees: employees })
});

// Update a employee by ID form
router.get('/update/:id',  (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('updateEmployee', {employee: employee});
});

// Read a employees by ID
router.get('/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('employee', { employee: employee })
});



module.exports = router;