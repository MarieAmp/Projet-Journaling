const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");

// form views

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

// action::Registering

router.post("/signup", (req, res, next) => {
  const user = req.body;
  console.log(req.body);

  UserModel.findOne({ email: user.email })
    .then((dbRes) => {
      if (dbRes) {
        var msg_signup = {
          status: "error",
          text:
            "this email adress is already registred. Sign-up or use a different email address",
        };
        console.log(msg_signup);
        return res.render("sign", { msg_signup });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(user.password, salt);
      user.password = hashed;

      UserModel.create(user).then(() => res.redirect("/auth/sign"));
    })
    .catch(next);
});

// action::Login

router.post("/signin", (req, res, next) => {
  const user = req.body;

  UserModel.findOne({ email: user.email })
    .then((dbRes) => {
      if (!dbRes) {
        var msg_signin = { status: "error", text: "wrong email" };
        return res.render("signin", { msg_signin });
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };
        delete clone.password;

        req.session.currentUser = clone;
        return res.redirect("/");
      } else {
        var msg_signin = { status: "error", text: "wrong password" };
        //console.log(msg);
        return res.render("signin", { msg_signin });
      }
    })
    .catch(next);
});

// action::Logout

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
