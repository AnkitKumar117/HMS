const express = require("express");
const Appointment= require("../models/appointment");
const appointmentAuth = require("../middlewares/appointmentAuth");
const router = new express.Router();

router.post("/appointment" , async(req,res)=>{
    console.log(req.body);
    const appointment = new Appointment(req.body);
    try {
        await appointment.save();
        const token =  await appointment.generateAuthToken();
        console.log(token);
        res.status(201).send({appointment , token});
    }
    catch (e){
        res.status(400).send(e);
    }
});

router.post("/appointment/create", async(req,res)=>{
    console.log(req.body);
    try{

    }
    catch  {
        
    }
});