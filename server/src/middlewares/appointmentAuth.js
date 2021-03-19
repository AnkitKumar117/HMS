const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointment");

const appointmentAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, "Hospital management system");
    const appointment = await Appointment.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!appointment) {
      throw new Error();
    }

    req.token = token;
    req.appointment = appointment;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = appointmentAuth;
