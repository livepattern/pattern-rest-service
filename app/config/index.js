
module.exports = {
  email: process.env.EMAIL,
  cors: process.env.CORS | false,
  manager: process.env.MANAGER_EMAIL,
  sendgridAPIKey: process.env.SENDGRID_API_KEY,
};
