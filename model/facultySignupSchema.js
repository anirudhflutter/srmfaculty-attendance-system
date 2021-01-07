const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    mobile: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    address: {
        type: String,
    },
    department: {
        type: String,
        require: true,
    },
    designation: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("faculty", facultySchema);