const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const responseSchema = new Schema({
  response: [String],
  date: Date,
  mood: {
    type: String,
    enum: ["Very Good", "Good", "Neutral", "Bad"]},
  id_user:{
        type: Schema.Types.ObjectId,
    ref: "User"},
  id_question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
  }
   
  });

const answerModel = mongoose.model("Responses", responseSchema);


module.exports = answerModel;
