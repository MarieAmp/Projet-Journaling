const express = require("express");
const router = new express.Router();
const axios = require("axios");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");


// URLS ARE PREFIXED WITH  *  /admin *

// Display, Make and Revoke admin

// create, update and delete users

// create, update and delete questions

module.exports = router;