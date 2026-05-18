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
}

module.exports = EmployeeService;