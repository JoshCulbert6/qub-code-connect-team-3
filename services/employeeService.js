// employeeService.js
const fs = require('fs');
const path = require('path');

class EmployeeService {
    constructor() {
        this.filePath = "employees.json";
    }

    // Helper function to read employees from JSON file
    readEmployees() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading employees:', err);
            return [];
        }
    }

    // Helper function to write employees to JSON file
   writeEmployees(employees) {
    try {
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(this.filePath, JSON.stringify(employees, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing employees:', err);
    }
}
    // Get all employees
    getAllEmployees() {
        return this.readEmployees();
    }

    // Get an empoyee by ID
    getEmployeeById(id) {
        const employees = this.readEmployees();
        return employees.find(employee => employee.id === id);
    }

    deleteEmployee(id) {
        const employees = this.readEmployees();
        const employeeIndex = employees.findIndex(employee => employee.id === id);
        if (employeeIndex === -1) return null;

        const deletedEmployee = employees.splice(employeeIndex, 1);
        this.writeEmployees(employees);
        return deletedEmployee[0];
    }

    // Create a new employee
    createEmployee(newEmployee) {
        const employees = this.readEmployees();
        newEmployee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
        employees.push(newEmployee);
        this.writeEmployees(employees);
        return newEmployee;
    }

    // Update an employee by ID
    updateEmployee(id, updatedEmployee) {
        const employees = this.readEmployees();
        const employeeIndex = employees.findIndex(employee => employee.id === id);
        if (employeeIndex === -1) return null;

        updatedEmployee.id = id;
        employees[employeeIndex] = updatedEmployee;
        this.writeEmployees(employees);
        return updatedEmployee;
    }

}

module.exports = EmployeeService;
