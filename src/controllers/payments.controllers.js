const PaymentsService = require("../services/payments.services");

const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const payment = await PaymentsService.createPayment(paymentData);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await PaymentsService.getPaymentById(paymentId);
    res.status(200).json(payment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const updatedData = req.body;
    const payment = await PaymentsService.updatePayment(paymentId, updatedData);
    res.status(200).json(payment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentsService.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  getAllPayments,
};
