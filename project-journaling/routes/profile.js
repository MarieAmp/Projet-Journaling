const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User")
require("./../config/mongodb")
const mongoose = require("mongoose")


module.exports = router;