const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    date: {
        type: String,
        require: true,
    },
    time: {
        type: String,
        require: true,
    },
    lat: {
        type: String,
        require: true,
    },
    long: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("attendance", attendanceSchema);