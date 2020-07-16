const express = require("express");
const router = new express.Router();
const axios = require("axios");
const QuestionModel = require("./../models/Question");
const UserModel = require("./../models/User");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");

// URLS ARE PREFIXED WITH  *  /admin *
router.get("/", (req, res, next) => {
  res.render("admin");
});

// Display, Make and Revoke admin
router.get(
  "/user-:id",
  protectPrivateRoute,
  protectAdminRoute,
  async (req, res, next) => {
    try {
      var user = await UserModel.findById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/user/:email",
  protectPrivateRoute,
  protectAdminRoute,
  async (req, res, next) => {
    try {
      var user = await UserModel.findOne({ email: req.params.email });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  `/revoke/:id`,
  protectPrivateRoute,
  protectAdminRoute,
  async (req, res, next) => {
    try {
      var user = await UserModel.findByIdAndUpdate(req.params.id, {
        admin: false,
      });
      console.log("revoked admin rights");
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  `/grant/:id`,
  protectPrivateRoute,
  protectAdminRoute,
  async (req, res, next) => {
    try {
      var user = await UserModel.findByIdAndUpdate(req.params.id, {
        admin: true,
      });
      console.log("granted admin rights");
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

// create, update and delete questions

router.get(
  "/questions/all",
  protectPrivateRoute,
  protectAdminRoute,
  async (req, res, next) => {
    try {
      var questions = await QuestionModel.find();
      res.json(questions);
    } catch (err) {
      res.send(err);
    }
  }
);

router.get(
  "/question/:id",
  protectPrivateRoute,
  protectAdminRoute,
  async (req, res, next) => {
    try {
      var question = await QuestionModel.findById(req.params.id);
      res.json(question);
    } catch (err) {
      res.send(err);
    }
  }
);


router.get("/question/keyword/:keyword", protectPrivateRoute, protectAdminRoute, async (req, res, next) => {
console.log('arrived in backend to fetch questions by keyword');
try {
  var questionList = await QuestionModel.find({ question: { $regex: `${req.params.keyword}` } });
  console.log('found questions with keyword', req.params.keyword);
  res.json(questionList)
}
catch (err) {
  next(err);
}
});


router.get(
  "/delete/question/:id",
  protectPrivateRoute,
  protectAdminRoute,
  async (req, res, next) => {
    try {
      await QuestionModel.findByIdAndDelete(req.params.id);
      res.send(`question ${req.params.id} deleted`);
    } catch (err) {
      res.send(err);
    }
  }
);

/* db.stores.find( { $question: { $regex: "\"coffee shop\"" } } )*/

module.exports = router;
