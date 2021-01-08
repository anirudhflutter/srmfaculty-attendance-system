var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();
var config = require('../config')
const e = require('express');
const attendanceSchema = require('../model/attendanceSchema');
const facultySignupSchema = require('../model/facultySignupSchema');

router.post("/attendance" , async function(req,res,next){
    const {date,time,lat,long,facultyId } = req.body;
    try {
        // let existData = await facultySignupSchema.find({_id : facultyId});
        // console.log(existData);
        
        var record = await new attendanceSchema({
            facultyData : facultyId,
            date: date,
            time: time,
            lat: lat,
            long: long,
        });
        await record.save();
        console.log(record._id);
        let attendanceDataIs = await attendanceSchema.find({ _id: record._id })
                                                     .populate({
                                                         path: "facultyData"
                                                     })
        if(record){
            res.status(200).json({ IsSuccess: true , Data: attendanceDataIs , Message: "Attendance Marked Successfully" });
        }else{
            res.status(200).json({ IsSuccess: true , Data: 0 , Message: "Please Try Again" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

module.exports = router;