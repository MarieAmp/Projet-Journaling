module.exports = function (req, res, next) {
  if (req.session.currentUser) next();
  else res.status(403).json({ message: "Forbidden" });
};
