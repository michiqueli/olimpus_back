const { Payment } = require("../db/db");
const { Op } = require("sequelize");
//const mercadopago = require('mercadopago');
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

//mercadopago.configurations.setAccessToken(ACCESS_TOKEN);

const { MercadoPagoConfig, Preference } = require("mercadopago");
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

const createPayment = async (paymentData) => {
  try {
    const mercadoPagoPreference = await createMercadoPagoPreference(
      paymentData
    );

    try {
      // Lógica para crear la preferencia de pago en MercadoPago
      const preference = await createMercadoPagoPreference(paymentData);

      // Guarda la información del pago en tu base de datos
      const payment = await Payment.create({
        current: 1, //paymentData.current,
        payername: 1, //paymentData.payername,
        quantity: 20, // paymentData.quantity,
        amount: 500, //paymentData.quantity * paymentData.unit_price,
        state: "Pendiente", // Puedes ajustar según tus necesidades
        date: new Date(),

        // Agrega campos específicos de MercadoPago
        mercadoPagoPreferenceId: preference.id,
        mercadoPagoInitPoint: preference.init_point,
      });

      return { url: preference.init_point };
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la preferencia de pago en MercadoPago");
    }

    /* return payment; */
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw new Error("Error al crear el pago");
  }
};

// Función para crear la preferencia de pago en MercadoPago
async function createMercadoPagoPreference(orderDetails) {
  // Agrega credenciales
  const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

  const preference = new Preference(client);

  const items = orderDetails.products.map((product) => ({
    title: product.name,
    quantity: product.quantity,
    currency_id: "ARS",
    unit_price: product.unit_price,
  }));

  try {
    const result = await preference.create({
      body: { items },
      redirect_urls: {
        success: "https://olimpus-shop.vercel.app/", // Reemplaza con la URL de éxito de tu aplicación
        failure: "https://olimpus-shop.vercel.app/", // Reemplaza con la URL de fracaso de tu aplicación
      },
    });

    console.log("OK", result);
    return result;
  } catch (error) {
    console.error(
      "Error al crear la preferencia de pago en MercadoPago:",
      error
    );
    throw error;
  }
}

const getPaymentById = async (paymentId) => {
  try {
    const payment = await Payment.findByPk(paymentId);
    return payment;
  } catch (error) {
    console.error("Error al obtener el pago por ID:", error);
    throw new Error("Error al obtener el pago");
  }
};

const updatePayment = async (paymentId, updatedData) => {
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      throw new Error("Pago no encontrado");
    }
    await payment.update(updatedData);
    return payment;
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    throw new Error("Error al actualizar el pago");
  }
};

const getAllPayments = async () => {
  try {
    const payments = await Payment.findAll();
    return payments;
  } catch (error) {
    console.error("Error al obtener todos los pagos:", error);
    throw new Error("Error al obtener todos los pagos");
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  getAllPayments,
};
