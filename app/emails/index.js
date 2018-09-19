let mail = require('@sendgrid/mail')
  , settings = require('../config');

mail.setApiKey(settings.sendgridAPIKey);

function storeEmail(to, from, b) {
  from = from ? from : settings.email;

  let _text = `Yo team,
    
    A new order has been placed on Live Pattern:
    
    Name: ${b.name}
    Email: ${b.email}
    Phone: ${b.phone}
    `;

  let message = {
    to: to,
    from: from,
    subject: 'ACTION REQUIRED: New order placed on LivePattern!',
    text: _text
  };

  return mail.send(message);
}

module.exports = {
  storeEmail
};
