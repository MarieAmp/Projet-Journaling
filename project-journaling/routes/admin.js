const express = require("express");
const router = new express.Router();
const axios = require("axios");
const QuestionModel = require("./../models/Question");
const UserModel = require("./../models/User");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const protectedAdminRouteAjax = require("../middlewares/protectAdminAjax");
const protectedPrivateRouteAjax = require("../middlewares/protectPrivateAjax");

// URLS ARE PREFIXED WITH  *  /admin *
router.get("/", protectAdminRoute, (req, res, next) => {
  res.render("admin");
});

// Display, Make and Revoke admin

router.get(
  "/users/all",
  protectedAdminRouteAjax,
  async (req, res, next) => {
    try {
      var users = await UserModel.find();
      res.json(users);
    } catch (err) {
      res.send(err);
    }
  }
);

router.get("/user-:id", protectedAdminRouteAjax, async (req, res, next) => {
  try {
    var user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/user/:email", protectedAdminRouteAjax, async (req, res, next) => {
  try {
    var user = await UserModel.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get(`/revoke/:id`, protectedAdminRouteAjax, async (req, res, next) => {
  try {
    var user = await UserModel.findByIdAndUpdate(req.params.id, {
      admin: false,
    });
    console.log("revoked admin rights");
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get(`/grant/:id`, protectedAdminRouteAjax, async (req, res, next) => {
  try {
    var user = await UserModel.findByIdAndUpdate(req.params.id, {
      admin: true,
    });
    console.log("granted admin rights");
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// create, update and delete questions

router.get(
  "/questions/all",
  protectedAdminRouteAjax,
  async (req, res, next) => {
    try {
      var questions = await QuestionModel.find();
      res.json(questions);
    } catch (err) {
      res.send(err);
    }
  }
);

router.get("/question/:id", protectedAdminRouteAjax, async (req, res, next) => {
  try {
    var question = await QuestionModel.findById(req.params.id);
    res.json(question);
  } catch (err) {
    res.send(err);
  }
});

router.get(
  "/question/keyword/:keyword",
  protectedAdminRouteAjax,
  async (req, res, next) => {
    console.log("arrived in backend to fetch questions by keyword");
    try {
      var questionList = await QuestionModel.find({
        question: { $regex: `${req.params.keyword}` },
      });
      console.log("found questions with keyword", req.params.keyword);
      res.json(questionList);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/new/question",
  protectedAdminRouteAjax,
  async (req, res, next) => {
    console.log("in back to create new question with ", req.body);
    try {
      var newQuestion = await QuestionModel.create(req.body);
      res.json(newQuestion);
    } catch (err) {
      res.send(console.error(err));
    }
  }
);

router.get(
  "/delete/question-:id",
  protectedAdminRouteAjax,
  async (req, res, next) => {
    try {
      await QuestionModel.findByIdAndDelete(req.params.id);
      res.json(console.log(`question ${req.params.id} deleted`));
    } catch (err) {
      res.send(err);
    }
  }
);

module.exports = router;
