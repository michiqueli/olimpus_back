const nodemailer = require("nodemailer");
const { EMAIL, PASS } = process.env;

const trasnporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

trasnporter.verify()
.then(() => (console.log("Email enviado con exito...")))
.catch((error) => console.error(error));

module.exports = trasnporter;