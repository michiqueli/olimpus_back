const trasnporter = require("../config/mailer.transport");
const { EMAIL } = process.env;

const mailServices = {
  registerEmail: async (name, email) => {
    console.log("enviando mail...");
    try {
      await trasnporter.sendMail({
        from: `mensaje enviado por <${EMAIL}>`,
        to: email,
        subject: "Bienvenidx a Olimpus Shop",
        text: "Registro Realizado con exito",
        html: `
        <body
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f4f4f4;
        "
      >
        <div
          style="
            text-align: center;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          "
        >
          <h2 style="color: #090f09">${name}</h2>
          <h1 style="color: #cfbc11">Bienvenido a Olimpus Shop</h1>
          <h2 style="color: #00cc22">Tu registro se completó con éxito</h2>
      
          <a href="https://olimpus-shop.vercel.app/" style="text-decoration: none">
            <button
              style="
                background-color: #fdd700;
                color: #000000;
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              "
            >
              Ya puedes comenzar a comprar
            </button>
          </a>
        </div>
      </body>
              `,
      });
      console.log("mail enviado con exito");
    } catch (error) {
      console.log(error.message);
    }
  },

  offLineEmail: async (name, email) => {
    console.log("enviando mail...");
    try {
      await trasnporter.sendMail({
        from: `mensaje enviado por <${EMAIL}>`,
        to: email,
        subject: "Usuario Desactivado",
        text: "Registro Realizado con exito",
        html: `
        <body
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f4f4f4;
        "
      >
        <div
          style="
            text-align: center;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          "
        >
          <h2 style="color: #090f09">${name}</h2>
          <h1 style="color: #cfbc11">Lo sentimos mucho</h1>
          <h2 style="color: #00cc22">Tu Cuenta a sido inHabilita debido a que has infringido alguna norma del sitio</h2>
      
          <a href="https://olimpus-shop.vercel.app/" style="text-decoration: none">
            <button
              style="
                background-color: #fdd700;
                color: #000000;
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
              "
            >
              Dirigite a nuestro sitio y contactanos
            </button>
          </a>
        </div>
      </body>
              `,
      });
      console.log("mail enviado con exito");
    } catch (error) {
      console.log(error.message);
    }
  }
};

module.exports = mailServices;
