const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  domain: { type: mongoose.Schema.Types.ObjectId, ref: "domain" },
  age_category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ageCategory' },
  title: String,
  maxScore: Number,
  thresholds: {
    suspectDelay: Number,
    confirmDelay: Number,
  },
  remarks: String,
});

module.exports = mongoose.model("domainComponent", componentSchema);
