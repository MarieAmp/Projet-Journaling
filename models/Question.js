const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  question: String,
  theme: { type: String, enum: ['relationships', 'personality', 'lifestyle', 'work', 'deep'] }, 
})

const QuestionModel = mongoose.model("Question", questionSchema);
module.exports = QuestionModel