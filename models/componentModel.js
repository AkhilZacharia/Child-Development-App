const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  domain: { type: mongoose.Schema.Types.ObjectId, ref: "domain" },
  title: String,
  maxScore: Number,
  thresholds: {
    suspectDelay: Number,
    confirmDelay: Number,
  },
  remarks: String,
});

module.exports = mongoose.model("domainComponent", componentSchema);
