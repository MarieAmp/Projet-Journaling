module.exports = function (req, res, next) {
  if (req.session.currentUser && req.session.currentUser.admin) next();
  else res.status(403).json({ message: "Forbidden" });
};
