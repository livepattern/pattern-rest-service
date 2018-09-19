let mail = require('@sendgrid/mail')
  , settings = require('../config');

mail.setApiKey(settings.sendgridAPIKey);

function storeEmail(to, from, order) {
  from = from ? from : settings.email;


  let message = {
    to: to,
    from: from,
    subject: 'ACTION REQUIRED: New order placed on LivePattern!',
    text: `Yo,
    
    New Order Placed:
    email: ${order.email}
    name: ${order.name}
    `
  };

  return mail.send(message);
}

module.exports = {
  storeEmail
};