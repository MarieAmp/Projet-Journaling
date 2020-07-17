const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt"); // intro to bcrypt hashing algorithm https://www.youtube.com/watch?v=O6cmuiTBZVs
const fileUploader = require("./../config/cloudinary");
const axios = require("axios");
const answerModel = require("../models/Answers");
const QuestionModel = require("../models/Question");
const hbs = require("hbs");
const { db } = require("../models/Answers");

router.get("/", (req, res, next) => {
  res.render("calendar", {script : `<script type="module" src="/javascripts/calendar.js"></script>`});
});

router.get("/show", (req, res, next) => {
  answerModel
    .find()
    .populate("id_question")
    .then((dbRes) => {
      // console.log(dbRes);
      res.json(dbRes);
    })
    .catch(next);
});

router.get("/past-answers/:id", (req, res, next) => {
 
  answerModel
    .find({id_question:req.params.id})
    .populate("id_question")
    .then((dbres) => {
      console.log(dbres);
      res.json(dbres);
    })
    .catch(next);
});

// router.get("/show", (req, res, next) => {
//   answerModel
//     .find()
//     .populate("Question")
//     .then((dbRes) => {
//       console.log(dbRes);
//       res.json(dbRes);
//       dbRes.forEach((resp) => {
//         QuestionModel.findById(resp.id_question).then((secondres) => {
//           console.log(secondres);
//           res.json(secondres) ;
//         });
//         dbRes.question = secondres.question;
//         console.log("2--", dbRes);
//         // res.json(dbRes)
//       });
//     })
//     .catch(next);
// });

// router.get("/calendar", (req, res, next) => {
//   answerModel
//     .find()
//     .populate("Question")
//     .then((dbRes) => {
// var questions = [];
// var dbResp = dbRes;
// dbResp.forEach((resp) => {
//   questions.push({question:resp.id_question, date:resp.date});

// questions.forEach((quest) => {
//   QuestionModel.findById(quest)
//     .then((res) => {
//       res.json(res)
//       var pastQuestions = res.question;
//       console.log(pastQuestions);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// });
//   })

//   .catch(next);
// });

// function getQuest(quest) {
//   QuestionModel.findById(quest)
//     .then((res) => {
//       var pastQuestions = res.question;
//       return pastQuestions;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

module.exports = router;
