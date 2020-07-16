const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt"); // intro to bcrypt hashing algorithm https://www.youtube.com/watch?v=O6cmuiTBZVs
const fileUploader = require("./../config/cloudinary");
const axios = require("axios");
const answerModel = require("../models/Answers");
const QuestionModel = require("../models/Question");
require("./../middlewares/exposeLoginStatus")
const hbs = require("hbs");
const { db } = require("../models/Answers");

function getQuote() {
  return axios.get(
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
  );
}

router.get("/", (req, res, next) => {
  res.render("dashboard", req.session.currentUser);
});

router.get("/quote", (req, res, next) => {
  getQuote()
    .then((apiRes) => {
      res.json(apiRes.data);
      // res.render("dashboard",apiRes.data)
    })
    .catch((err) => console.log(err));
});





module.exports = router;
