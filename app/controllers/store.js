let emails = require('../emails')
  , config = require('../config');

let { error, success } = require('./index');


async function post(req, res) {
  try {
    emails.storeEmail(config.manager, config.email, req.body)
      .catch(err => console.error('err::post', err));
    return success(req, res, "hello");
  } catch (err) {
    return error(req, res, 400, err);
  }
}

module.exports = {
  post,
};
