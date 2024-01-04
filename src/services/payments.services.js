const { Payment } = require("../db/db");
const { Op } = require("sequelize");

const createPayment = async (paymentData) => {
  try {
    const payment = await Payment.create(paymentData);
    return payment;
  } catch (error) {
    throw new Error("Error al crear el pago");
  }
};

const getPaymentById = async (paymentId) => {
  try {
    const payment = await Payment.findByPk(paymentId);
    return payment;
  } catch (error) {
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
    throw new Error("Error al actualizar el pago");
  }
};

const getAllPayments = async () => {
  try {
    const payments = await Payment.findAll();
    return payments;
  } catch (error) {
    throw new Error("Error al obtener los pagos");
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  getAllPayments,
};
