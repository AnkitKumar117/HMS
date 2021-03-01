const mongoose= require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    patient_id: {
        type: Number
    },
    
    address: {
        type: String
    },
    age: {
        type: Number
    },
    contact_detail: {
        type: Number
    },
    payment: {
        type: Number
    },
    others: {
        type: String
    }

})
const Patient = mongoose.model("patient", patientSchema);
module.exports = Patient;