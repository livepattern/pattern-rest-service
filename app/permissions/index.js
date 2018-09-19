
function allowAny(req, res, next) {
  next();
}

module.exports = {
  allowAny
};