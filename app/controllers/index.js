
function success(req, res, body) {
  if (body) return res.status(200).json({ data: body, error: null, status: 200 });
  return res.status(204).json({ data: null, error: null, status: 200 });
}

function error(req, res, status, message) {
  let err = { data: null, error: { message: "Something went wrong.", trace: message }, status: status };
  return res.status(status).json(err);
}

function forbidden(req, res) {
  return res.status(403).json({ data: null, error: "Not permitted to carry out this action.", status: 403 });
}

module.exports = {
  success,
  error,
  forbidden
};