let emails = require('../emails')
  , config = require('../config')
  , path = require('path')
  , writeFile = require('../utils').writeFile;

let { success } = require('./index');


async function post(req, res) {
  let order = req.body;
  let normalizedEmail = order.email.replace('@', '').split('.').join('');
  let filename = path.join(__dirname, '../dump', `${normalizedEmail}-${Date.now()}`);

  writeFile(filename, JSON.stringify(order))
    .then(() => console.log('Order Stored!'))
    .catch(err => {
      console.error(err);
      console.log('Order storage failed!', req.body);
    });

  emails
    .storeEmail(config.manager, config.email, req.body)
    .then(() => console.log('Order emailed!'))
    .catch(err => console.error('Email delivery failed!', err));

  return success(req, res, "hello");
}

module.exports = {
  post,
};
