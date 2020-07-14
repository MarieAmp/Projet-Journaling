const express = require("express");
const router = new express.Router();
const axios = require("axios");
const QuestionModel = require("./../models/Question");
const AnswerModel = require("./../models/Answers");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");


// URLS ARE PREFIXED WITH  *  /dashboard/collections *

router.get("/", protectPrivateRoute, async (req, res, next) => {

try {
  var questions = await QuestionModel.find();
  var answers = await AnswerModel.find();
  res.render("lists", {questions, answers})
}
catch (err) {
  res.send(err)
}
})


router.get("/question-:id", protectPrivateRoute, async (req, res, next) => {

  try {
    var question = await QuestionModel.findById(req.params.id);
    var answers = await AnswerModel.find();
    res.render("lists", {questions, answers})
  }
  catch (err) {
    res.send(err)
  }
  })


module.exports = router;