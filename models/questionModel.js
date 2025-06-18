const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  domain_id: { type: mongoose.Schema.Types.ObjectId, ref: 'domain'},
  age_category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ageCategory' },
  section_id: String,
  status:Boolean,
  scoring: [{"Always": 4},{"Frequently": 3},{"Seldom": 2},{"Never": 1}]
  
});

module.exports = mongoose.model('question', QuestionSchema);
