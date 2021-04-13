const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

const patientAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, "Hospital management system");
    // console.log(decoded)
    const patient = await Patient.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!patient) {
      throw new Error();
    }

    req.token = token;
    req.patient = patient;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = patientAuth;
