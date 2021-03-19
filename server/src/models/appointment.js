const mongoose = require("mongoose");
const validator= require("validator");
const jwt = require("jsonwebtoken");

const appointmentSchema = new mongoose.Schema(
    {
        patient_id:{
            type: String,
            trim: true,
            required: true,
        },
        patient_id :{
            type: String,
            trim: true,
            required: true,
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
        },
        tokens: [
            {
              token: {
                type: String,
                required: true,
              },
            },
          ],
    },
    {
        timestamps:true,
    }
);

appointmentSchema.methods.generateAuthToken= async function(){
    const appointment = this;
    const token = jwt.sign(
        {
            _id = appointment._id.toString()
        },
        "Hospital management system"
    );
    appointment.tokens = appointment.token.concat({token});
    await appointment.save();
};

appointmentSchema.statics.findByCrendentials = async


const Appointment = mongoose.model("Appointment" ,appointmentSchema);
module.exports = Appointment;