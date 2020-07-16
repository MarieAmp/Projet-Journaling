const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User")
require("./../config/mongodb")
const mongoose = require("mongoose")
require("./../middlewares/exposeLoginStatus")

router.get("/", (req, res, next) => {
  res.render("profile", req.session.currentUser)
  console.log(req.session.currentUser)
});

router.get("/edit", (req, res, next) => {
  res.render("profile-edit", req.session.currentUser)
});

router.post("/edit/:id", (req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body)
    .then((dbRes) => res.redirect("/profile"), console.log(req.body))
    .catch(next);
});


module.exports = router

module.exports = router
