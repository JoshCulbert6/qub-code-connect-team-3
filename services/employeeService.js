    // userService.js
const fs = require('fs');

class EmployeeService {
    constructor() {
        this.filePath = "employee.json";
    }
    
    readEmployees() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading users:', err);
            return [];
        }
    }

    writeEmployees(employees) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(employees, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing employees:', err);
        }
    }

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
}

module.exports = EmployeeService;