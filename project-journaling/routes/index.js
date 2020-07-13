const express = require("express");
const router = express.Router();
const QuestionModel = require("./../models/Question");
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
      console.log(dbRes, random)
      res.render("index", random);
    })
    .catch(next);
});

module.exports = router;
