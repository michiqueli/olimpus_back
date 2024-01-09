const { Payment } = require("../db/db");
const { Op } = require("sequelize");
const mercadopago = require("mercadopago");

mercadopago.configurations.setAccessToken(ACCESS_TOKEN);

const createPayment = async (paymentData) => {
  try {
    // Integra la lógica de MercadoPago para obtener la preferencia de pago
    const mercadoPagoPreference = await createMercadoPagoPreference(
      paymentData
    );

    // Guarda la información del pago en tu base de datos
    const payment = await Payment.create({
      current: paymentData.current,
      payername: paymentData.payername,
      quantity: paymentData.quantity,
      amount: paymentData.amount,
      state: "Pendiente", // Puedes ajustar según tus necesidades
      date: new Date(),
      // Agrega campos específicos de MercadoPago
      mercadoPagoPreferenceId: mercadoPagoPreference.id,
      mercadoPagoInitPoint: mercadoPagoPreference.init_point,
    });

    return payment;
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

// Función para crear la preferencia de pago en MercadoPago
const createMercadoPagoPreference = async (paymentData) => {
  const items = [
    {
      title: "Descripción del producto", // Reemplaza con la descripción de tu producto
      quantity: paymentData.quantity,
      currency_id: "ARS", // Moneda (puedes ajustar según tu configuración)
      unit_price: paymentData.amount,
    },
  ];

  const preference = {
    items,
    payer: {
      name: paymentData.payername, // Reemplaza con el nombre del pagador
    },
    redirect_urls: {
      success: "URL_DE_TU_APP/success", // Reemplaza con la URL de éxito de tu aplicación
      failure: "URL_DE_TU_APP/failure", // Reemplaza con la URL de fracaso de tu aplicación
    },
  };

  // Crea la preferencia de pago en MercadoPago
  const response = await mercadopago.preferences.create(preference);

  return response.body;
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  getAllPayments,
};
