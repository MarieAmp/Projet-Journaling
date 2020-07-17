const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User")
require("./../config/mongodb")
const mongoose = require("mongoose")
require("./../middlewares/exposeLoginStatus")

router.get("/", (req, res, next) => {
  res.render("profile")

});

router.get("/edit", (req, res, next) => {
  res.render("profile-edit")
});

router.post("/edit/:id", (req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then((dbRes) =>{
      req.session.currentUser = dbRes;
      res.redirect("/profile"), console.log(req.body)
    })
    .catch(next);
});


module.exports = router

module.exports = router
