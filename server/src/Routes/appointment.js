const express = require("express");
const Appointment = require("../models/appointment");
const patientAuth = require("../middlewares/patientAuth");
const doctorAuth = require("../middlewares/doctorAuth");
const router = new express.Router();

router.post("/patient/appointment", patientAuth, async (req, res) => {
  console.log(req.body);
  // const appointment = new Appointment(req.body);
  try {
    const appointment = new Appointment({
      doctor_name: req.body.doctor_name,
      doctor_specialization: req.body.doctor_specialization,
      doctor_id: req.body.doctor_id,
      patient_id: req.patient._id,
      patient_desc: req.body.patient_desc,
      patient_age: req.patient.age,
      patient_name: req.patient.name,
    });
    appointment.save();
    console.log(appointment);
    res.status(201).send(appointment);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/doctor/description", doctorAuth, async (req, res) => {
  console.log(req.body);
  try {
    const appointment = await Appointment.findOne({
      _id: req.body._id
    });
    console.log(appointment);
    if (!appointment) {
      return res.status(404).send();
    }
    appointment["doctor_desc"] = req.body["doctor_desc"];
    await appointment.save();
    res.status(200).send(appointment);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/allappointment", doctorAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor_id: req.doctor._id });
    // console.log(appointments);
    res.status(200).send(appointments);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/myappointment" , patientAuth , async(req, res)=>{
  try {
    const myappointment = await Appointment.find({ patient_id: req.patient._id });
    //console.log(myappointment);
    res.status(200).send(myappointment);
  } catch(e){
    res.status(400).send(e);
  }
});


module.exports = router;
