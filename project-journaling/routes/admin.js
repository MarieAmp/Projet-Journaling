const express = require("express");
const router = new express.Router();
const axios = require("axios");
const QuestionModel = require("./../models/Question");
const UserModel = require("./../models/User");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");


// URLS ARE PREFIXED WITH  *  /admin *
router.get("/", (req,res,next) => {
  res.render("admin")
})




// Display, Make and Revoke admin
router.get("/user-:id", protectPrivateRoute, protectAdminRoute, async (req,res,next) => {
try {
  var user = await UserModel.findById(req.params.id);
res.json(user)
}
catch (err) {
  next(err)
}
})

// create, update and delete users

// create, update and delete questions

router.get("/questions/all", protectPrivateRoute, async (req, res, next) => {

  try {
    var questions = await QuestionModel.find();
    res.json(questions)
  }
  catch (err) {
    res.send(err)
  }
  })


  router.get("/delete/question-:id", protectPrivateRoute, async (req, res, next) => {

    try {
    await QuestionModel.findByIdAndDelete(req.params.id);
      res.json(console.log(`question ${req.params.id} deleted`))
    }
    catch (err) {
      res.send(err)
    }
    })



module.exports = router;