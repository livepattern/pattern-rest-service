let mail = require('@sendgrid/mail')
  , settings = require('../config');

mail.setApiKey(settings.sendgridAPIKey);

function storeEmail(to, from, b) {
  from = from ? from : settings.email;
  let _message = b.message ? b.message : "_";

  let _text = "Hurray!<br><br>";

  _text += "A new order has been placed on Live Pattern, below are the details:<br><br>Contact Information:<br>";

  _text += `Email: ${b.email}<br>`;
  _text += `Message: ${_message}<br><br>`;

  _text += `Cart Information:<br>`;
  _text += `Term: ${b.order.term} months<br>`;
  _text += "Items:<br>";

  let _total = 0;
  b.order.cart.map(x => {
    _text += `+ Product: ${x.product}, Quantity: ${x.quantity}, Price: ${x.price}<br>`;
    _total += x.price * x.quantity;
  });

  _text += `<br>Total: ${_total}<br><br>`;

  _text += "Good luck,<br>Team Pattern!";


  let message = {
    to: to,
    from: from,
    subject: 'ACTION REQUIRED: New order placed on LivePattern!',
    html: _text
  };

  return mail.send(message);
}

module.exports = {
  storeEmail
};
