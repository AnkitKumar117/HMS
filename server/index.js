const express = require('express')
require('./src/db/mongoose');
const doctorRouter = require('./src/Routes/doctor')
const patientRouter = require('./src/Routes/patient')
const appointmentRouter = require('./src/Routes/appointment')
const employeeRouter = require('./src/Routes/employee')
//const connectionURL = 'express: //127.0.0.1:5000'
const app = express();

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, POST, DELETE, HEAD, OPTIONS"
    );
  
    next();
  });

app.use(doctorRouter)
app.use(patientRouter)
app.use(employeeRouter)
app.use(appointmentRouter)

app.get("", (req, res) =>{
    res.send('Testing 123 ..');
})


app.listen(5000, () => {
    console.log('server:5000')
})