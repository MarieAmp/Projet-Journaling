require("dotenv").config();
require("./../config/mongodb");

const QuestionModel = require("./../models/Question")

const questions = [
  {
    question: "What makes you proud ?", 
    theme: "happiness", 
  }
]

QuestionModel.insertMany(questions)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.log(dbErr));