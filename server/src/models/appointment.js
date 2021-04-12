const mongoose = require("mongoose");
const validator= require("validator");
const jwt = require("jsonwebtoken");

const appointmentSchema = new mongoose.Schema(
    {
        patient_name: {
            type: String,
            trim: true,
        },
        doctor_name: {
            type: String,
            trim: true,
        },
        patient_age: {
            type: String,
            trim: true,
        },
        doctor_specialization: {
            type: String,
            trim: true,
        },
        patient_id:{
            type: String,
            trim: true,
            
        },
        doctor_id :{
            type: String,
            trim: true,
            required: true,
        },
        patient_desc:{
            type: String,
            trim: true,
            required: true,
        },
        doctor_desc: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps:true,
    }
);

const Appointment = mongoose.model("Appointment" ,appointmentSchema);
module.exports = Appointment;