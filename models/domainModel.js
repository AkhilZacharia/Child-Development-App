const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  domainNumber: Number,
  domainName: {type: String, required: true},
  description: {type: String, default: ''},
  ageCategories: [{type: mongoose.Schema.Types.ObjectId,ref: 'ageCategory' ,required: true }],
  questions: {type:[{type: mongoose.Schema.Types.ObjectId,ref: 'question' }], default:[]},
});

module.exports = mongoose.model("domain", domainSchema);
