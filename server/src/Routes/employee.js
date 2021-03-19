const express = require("express");
const Employee= require("../models/employee");
const employeeAuth = require("../middlewares/employeeAuth");
const router = new express.Router();

router.post("/employee", async (req, res) => {
  console.log(req.body);
  const employee = new Employee(req.body);
  try {
    await employee.save();
    const token = await employee.generateAuthToken();
    console.log(token);
    res.status(201).send({ employee, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/employee/login", async (req, res) => {
  console.log(req.body);
  try {
    const employee = await Employee.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(employee);
    const token = await employee.generateAuthToken();
    res.send({ employee, token });
  } catch (e) {
    res
      .status(400)
      .send({ error: "Employee not registered. Please register!!!" });
  }
});

router.post("/employee/logout", employeeAuth, async (req, res) => {
  try {
    req.employee.tokens = req.employee.tokens.filter(
      (token) => token.token != req.token
    );
    await req.employee.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/employee/me", employeeAuth, async (req, res) => {
  res.send(req.employee);
});

module.exports = router;
