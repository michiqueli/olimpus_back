const { Payment } = require('../db/db');
const { MercadoPagoConfig, Preference, Item } = require("mercadopago");
const { Op } = require("sequelize");
require("dotenv").config();

const { ACCESS_TOKEN } = process.env;

// Configuración de MercadoPago
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

// Función para crear la preferencia de pago en MercadoPago
async function createMercadoPagoPreference(orderDetails) {
  const preference = new Preference(client);

  // Mapea los productos del carrito a los ítems de la preferencia
  const items = orderDetails.products.map((product) => new Item({
    title: product.title, // Utiliza el título del producto
    quantity: product.quantity,
    currency_id: "ARS",
    unit_price: product.unit_price,
  }));

  try {
    // Utiliza client.createPreference para establecer los detalles de la preferencia
    const result = await client.createPreference({
      items,
      back_urls: {
        success: "https://olimpus-shop.vercel.app/",
        failure: "https://olimpus-shop.vercel.app/",
      },
    });

    console.log("OK", result);
    return result.body;
  } catch (error) {
    console.error(
      "Error al crear la preferencia de pago en MercadoPago:",
      error
    );
    throw error;
  }
}

const createPayment = async (paymentData) => {
  try {
    // Lógica para crear la preferencia de pago en MercadoPago
    const mercadoPagoPreference = await createMercadoPagoPreference(paymentData);

    try {
      // Guarda la información del pago en tu base de datos
      const payment = await Payment.create({
        current: paymentData.current,
        payername: paymentData.payername,
        quantity: paymentData.products.reduce((total, product) => total + product.quantity, 0),
        amount: paymentData.products.reduce((total, product) => total + product.quantity * product.unit_price, 0),
        state: "Pendiente",
        date: new Date(),

        // Agrega campos específicos de MercadoPago
        mercadoPagoPreferenceId: mercadoPagoPreference.id,
        mercadoPagoInitPoint: mercadoPagoPreference.init_point,
      });

      return { url: mercadoPagoPreference.init_point };
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la preferencia de pago en MercadoPago");
    }

  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw new Error("Error al crear el pago");
  }
};

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
