const express = require('express')
const Hospital = require('../models/Hospital')
const router = new express.Router()

router.post('/hospital', async (req, res) => {
    const hospital = new Hospital(req.body)

    try {
        await hospital.save()
        res.status(201).send(hospital)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.get('/hospital', async(req,res)=>{
    
// })


module.exports = router