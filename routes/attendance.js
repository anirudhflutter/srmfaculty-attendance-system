var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();
var config = require('../config')
const e = require('express');
const attendanceSchema = require('../model/attendanceSchema');

router.post("/attendance" , async function(req,res,next){
    const {date,time,lat,long } = req.body;
    try {
        var record = await new attendanceSchema({
            date: date,
            time: time,
            lat: lat,
            long: long
        });
        record.save();
        console.log(record);
        if(record){
            res.status(200).json({ IsSuccess: true , Data: record , Message: "Attendance Marked Successfully" });
        }else{
            res.status(200).json({ IsSuccess: true , Data: 0 , Message: "Please Try Again" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

module.exports = router;