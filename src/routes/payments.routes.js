const { Router } = require("express");
const PaymentsController = require("../controllers/payments.controllers");

const router = Router();

router.post("/create", PaymentsController.createPayment);
router.get("/:id", PaymentsController.getPaymentById);
router.put("/:id", PaymentsController.updatePayment);
router.get("/", PaymentsController.getAllPayments);

module.exports = router;
