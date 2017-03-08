var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  creator : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description : { type: String, required: true },
//  category : { type: String, required: true },
  //status : { type: Boolean, default: true, required: true },
  optionA: {type: String, required: true},
  votesA: {type: Number, default: 0, required: true},

  optionB: {type: String, required: true},
  votesB: {type: Number, default: 0, required: true},

  //id : { type: Number, required: true },
  },
  {
  timestamps : true
});

var Question = mongoose.model('Question', questionSchema);
module.exports = Question;
