const mongoose= require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    employee_id: {
        type: Number
    },
    address: {
        type: String
    },
    contact_detail: {
        type: Number
    }

})
const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;