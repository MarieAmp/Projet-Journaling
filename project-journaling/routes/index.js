const express = require("express");
const router = express.Router();
const QuestionModel = require("./../models/Question");
const answerModel = require("./../models/Answers");
require("./../config/mongodb");
const mongoose = require("mongoose");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {script : `<script type="module" src="/javascripts/script.js"></script>`});
});

router.get("/about", (req, res, next) => {
  res.render("about", {script :`<script type="module" src="/javascripts/script.js"></script>`})

})


router.get("/question", (req, res, next) => {
  QuestionModel.find()
    .then((dbRes) => {
      var random = dbRes[Math.floor(dbRes.length * Math.random())];
      console.log(dbRes, random);
      res.json(random);
    })
    .catch(next);
});

router.post("/answer", (req, res, next) => {
  answerModel.create(req.body)
    .then((dbRes) => {
      res.json(dbRes)
      console.log('answer created, ID is ',dbRes._id);
    })
    .catch(next);
});

router.get("/mood", (req, res, next) => {
  res.send('in mood - unnecessary axios request')
});

  router.post("/editanswer/:id", (req, res, next) => {
    console.log('in answer update id is - ', req.params.id);
    console.log('update to do is - ', req.body)
    answerModel.findByIdAndUpdate(req.params.id, req.body)
      .then((dbRes) => {
        console.log('answer updated')
        console.log(dbRes)
        res.json(dbRes);
      })
      .catch((err) => next(err));
  });


module.exports = router;
