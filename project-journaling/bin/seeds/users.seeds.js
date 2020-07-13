require("dotenv").config();
require("./../../config/mongodb");

const UserModel = require("./../../models/User");

const users = [
  {
    name: "John",
    lastName: "Doe",
    birthday: Date,
    email: "jdo@mail.co",
    password : "String",
    plan: "free",
    admin: false,
  },
  {
    name: "Jane",
    lastName: "Red",
    birthday: Date,
    email: "jred@mail.co",
    password : "Gnirts",
    plan: "premium",
    admin: false,
  },
  {
    name: "Dave",
    lastName: "Lauper",
    birthday: Date,
    email: "dvpr@pjt.co",
    password : "h4ck",
    plan: "free",
    admin: true,
  }
];

UserModel.create(users)
.then(dbRes => console.log(dbRes))
.catch(dbErr => console.error(dbErr))
