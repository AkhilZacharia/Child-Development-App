const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  domainNumber: Number,
  domainName: String,
  ageCategories: String, 
});

module.exports = mongoose.model("domain", domainSchema);
