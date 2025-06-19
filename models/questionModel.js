const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {type: String , required:true},
  status:{type:Boolean , default:true},
  domain_id: { type: mongoose.Schema.Types.ObjectId, ref: 'domain', required:true},
  age_category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ageCategory', required:true},
  answers: { type: [mongoose.Schema.Types.Mixed], default: [
      { "Always": 4 },
      { "Frequently": 3 },
      { "Seldom": 2 },
      { "Never": 1 }
    ]}

});

module.exports = mongoose.model('question', QuestionSchema);
 