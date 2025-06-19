const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  domainNumber: Number,
  domainName: String,
  description: {type: String, default: ''},
  ageCategories: [{type: mongoose.Schema.Types.ObjectId,ref: 'ageCategory' }],
  questions: {type:[{type: mongoose.Schema.Types.ObjectId,ref: 'question' }], default:[]},
});

module.exports = mongoose.model("domain", domainSchema);
