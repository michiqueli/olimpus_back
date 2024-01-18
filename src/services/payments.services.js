const { Payment } = require("../db/db");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { Op } = require("sequelize");
require("dotenv").config();

const { ACCESS_TOKEN } = process.env;

//mercadopago.configurations.setAccessToken(ACCESS_TOKEN);
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

const createPayment = async (paymentData) => {
  try {
    // Lógica para crear la preferencia de pago en MercadoPago
    const preference = await createMercadoPagoPreference(paymentData);
    console.log(paymentData);
    // Guarda la información del pago en tu base de datos
    const payment = await Payment.create({
      current: "ARS",
      payername: paymentData.payer.email,
      quantity: paymentData.items.length,
      amount: paymentData.amount,
      usuarioId: paymentData.payer.UsuarioId,
      compraId: paymentData.compraId,
      state: "Pendiente",
      date: new Date(),

      mercadoPagoPreferenceId: preference.id,
      mercadoPagoInitPoint: preference.init_point,
    });

    return { url: preference.init_point };
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la preferencia de pago en MercadoPago");
  }
};

// Función para crear la preferencia de pago en MercadoPago
async function createMercadoPagoPreference(orderDetails) {
  // Agrega credenciales
  const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

  const preference = new Preference(client);

  const items = orderDetails.items.map((item) => ({
    title: item.title,
    quantity: item.quantity,
    currency_id: "ARS",
    unit_price: item.unit_price,
    description: item.description,
    category_id: item.category_id,
  }));
  const payer = {
    name: orderDetails.payer.name,
    email: orderDetails.payer.email,
  };
  console.log(payer);

  try {
    const result = await preference.create({
      body: {
        items,
        payer,
        back_urls: {
          success: `https://olimpus-shop.vercel.app/userDetail/${orderDetails.payer.UsuarioId}`, // Reemplaza con la URL de éxito de tu aplicación
          failure: "https://olimpus-shop.vercel.app/catalogo", // Reemplaza con la URL de fracaso de tu aplicación
        },
        auto_return: "approved",
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
