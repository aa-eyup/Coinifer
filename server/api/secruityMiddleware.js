const isLoggedInUser = (req, res, next) => {
  console.log(req.user.id);
  console.log(req.params.userId);
  if (+req.user.id === +req.params.userId) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {isLoggedInUser};
