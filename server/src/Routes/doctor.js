const express = require("express");
const Doctor = require("../models/doctor");
const doctorAuth = require("../middlewares/doctorAuth");
const router = new express.Router();

router.post("/doctor", async (req, res) => {
  console.log(req.body);
  const doctor = new Doctor(req.body);
  try {
    await doctor.save();
    const token = await doctor.generateAuthToken();
    console.log(token);
    res.status(201).send({ doctor, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/doctor/login", async (req, res) => {
  console.log(req.body);
  try {
    const doctor = await Doctor.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(doctor);
    const token = await doctor.generateAuthToken();
    res.send({ doctor, token });
  } catch (e) {
    res
      .status(400)
      .send({ error: "Doctor not registered. Please register!!!" });
  }
});

router.post("/doctor/logout", doctorAuth, async (req, res) => {
  try {
    req.doctor.tokens = req.doctor.tokens.filter(
      (token) => token.token != req.token
    );
    await req.doctor.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/doctor/me", doctorAuth, async (req, res) => {
  res.send(req.doctor);
});

module.exports = router;
