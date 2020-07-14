const express = require("express");
const router = express.Router();
const QuestionModel = require("./../models/Question");
const answerModel = require("./../models/Answers");
require("./../config/mongodb");
const mongoose = require("mongoose");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/question", (req, res, next) => {
  QuestionModel.find()
    .then((dbRes) => {
      var random = dbRes[Math.floor(dbRes.length * Math.random())];
      console.log(dbRes, random);
      res.json(random);
    })
    .catch(next);
});

router.post("/question", (req, res, next) => {
  answerModel.create(req.body)
    .then((dbRes) => {
      res.json(dbRes)
      console.log('answer created');
    })
    .catch(next);
});

router.get("/mood", (req, res, next) => {
  res.send('in mood')
});

  router.post("/mood"), (req, res, next) => {
    answerModel.findByIdAndUpdate(req.params.id, req.body)
      .then((dbRes) => {
        res.send("updated" + dbRes);
      })
      .catch(next);
  };


module.exports = router;
