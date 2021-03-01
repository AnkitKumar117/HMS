const express = require('express')
require('./src/db/mongoose');
const doctorRouter = require('./src/Routes/doctor')
//const connectionURL = 'express: //127.0.0.1:5000'
const app = express();

app.use(express.json())
app.use(doctorRouter)

app.get("", (req, res) =>{
    res.send('Call me daddy')
})


app.listen(5000, () => {
    console.log('server:5000')
})