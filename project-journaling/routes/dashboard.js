const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt"); // intro to bcrypt hashing algorithm https://www.youtube.com/watch?v=O6cmuiTBZVs
const fileUploader = require("./../config/cloudinary");

function getQuote() {
  axios.get(
      "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    )
    .then((dbres) => {
      console.log(dbres.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

rou

// router.get("/", (req, res,next) => {
//   getQuote()
//     .then((res) => {
//       console.log(res);
//     })
//     .catch(next);
// });

// module.exports = router;
