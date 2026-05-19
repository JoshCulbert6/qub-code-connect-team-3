var express = require('express');
var router = express.Router();

const EmployeeService = require('../services/employeeService.js');
const employeeService = new EmployeeService();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('adminDashboard', { title: 'Express' });
});



router.get('/delete/:id', (req, res) => {
  const employee = employeeService.getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send('Employee not found');
  res.render('deleteEmployee', {employee: employee})
});







module.exports = router;
