module.exports = (req, res, next) => {
  req.session.currentUser = {
    _id: "5f0c84a38f22a7050a8961e0", // change the user id here to fit yor needs
    name: "Dave",
    lastnamne : "Lauper",
    birthday: "1970-01-01T00:00:00.000+00:00",
    email: "dvpr@pjt.co",
    plan : "premium",
    admin : true
  };
  next();
};

