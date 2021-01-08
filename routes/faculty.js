var express = require('express');
var router = express.Router();
var config = require('../config')
const mongoose = require("mongoose");
const e = require('express');
const facultySignupSchema = require('../model/facultySignupSchema');

router.post("/register" , async function(req,res,next){
    const { name, mobile, email, address, department, designation } = req.body;
    try {
        let existData = await facultySignupSchema.aggregate(
            [ { $match : { mobile : mobile } } ]
        );
        if(existData.length == 1){
            res.status(200).json({ IsSuccess: true , Message: "Faculty Details Already Exist, Please Log In" });
        }else{
            var record = await new facultySignupSchema({
                name: name,
                mobile: mobile,
                email: email,
                address: address,
                department: department,
                designation: designation
            });
            record.save();
            console.log(record);
            if(record){
                res.status(200).json({ IsSuccess: true , Data: record , Message: "Faculty Registered Successfully" });
            }else{
                res.status(200).json({ IsSuccess: true , Data: 0 , Message: "Registration Failed" });
            }
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

router.post("/login" , async function(req,res,next){
    const { mobile } = req.body;
    try {
        var record = await facultySignupSchema.aggregate(
            [ { $match : { mobile : mobile } } ]
        );
        if(record.length==1){
            res.status(200).json({ IsSuccess: true , Data: record , Message: "Faculty LoggedIn Successfully" });
        }
        else{   
            res.status(200).json({ IsSuccess: true , Data: 0 , Message: "This Mobile Number is not Registered" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

router.post("/getalldata" , async function(req,res,next){
    try {
        
        let records = await facultySignupSchema.find();

        console.log(records);

        if(records.length > 0){
            res.status(200).json({ IsSuccess: true , Data: records , Message: "Data Found" });
        }
        else{   
            res.status(200).json({ IsSuccess: true , Data: 0 , Message: "No Data Found" });
        }
    } catch (error) {
        res.status(500).json({ IsSuccess: false , Message: error.message });
    }
});

module.exports = router;
