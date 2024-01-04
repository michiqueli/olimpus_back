const nodemailer = require("nodemailer");
const { EMAIL, PASS } = process.env;

const trasnporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "olimpus.shop.mailer@gmail.com",
    pass: "whfb bbku dihd gxzl",
  },
  tls: {
    rejectUnauthorized: false, // Desactivar solo en entornos de desarrollo
  },
});

module.exports = trasnporter;