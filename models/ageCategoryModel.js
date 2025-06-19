const mongoose = require('mongoose');

const ageCategorySchema = new mongoose.Schema({
  
  label: {type: String, required: true,  unique: true },
  ageInMonths: { type: Number, required: true, min: 0 },
  description: {type: String, default: ''},
  isActive: { type: Boolean,default: true}
});

module.exports = mongoose.model('ageCategory', ageCategorySchema);
