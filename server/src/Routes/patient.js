const express = require("express");
const Patient = require("../models/patient");
const patientAuth = require("../middlewares/patientAuth");
const router = new express.Router();

router.post("/patient", async (req, res) => {
  const patient = new Patient(req.body);
  try {
    await patient.save();
    console.log('x');
    const token = await patient.generateAuthToken();
    console.log(token);
    // console.log(patient)
    res.status(201).send({ patient, token });
  } catch (e) {
    res.status(400).send(e);
    // console.log(patient)
  }
});

router.post("/patient/login", async (req, res) => {
  console.log(req.body);
  try {
    const patient = await Patient.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(patient);
    const token = await patient.generateAuthToken();
    res.send({ patient, token });
    res.status(201).send({ patient, token });
  } catch (e) {
    res.status(400).send({ error: "Patient is not admitted." });
  }
});

router.post("/patient/logout", patientAuth, async (req, res) => {
  try {
    req.patient.tokens = req.patient.tokens.filter(
      (token) => token.token != req.token
    );
    await req.patient.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/patient/me", patientAuth, async (req, res) => {
  res.send(req.patient);
});

module.exports = router;
