const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  age:Number,
  gender: String,
  parentName: String,
  contactInfo: {
    phone: String,
    email: String,
  },
});

module.exports = mongoose.model("user", childSchema);
