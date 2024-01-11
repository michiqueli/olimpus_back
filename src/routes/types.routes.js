const { Router } = require("express");
const router = Router();

const TypeControllers = require("../controllers/types.controllers");

router.get("/", TypeControllers.getAllTypes);
router.get("/subTypes", TypeControllers.getSubTypes);
router.get("/subTypes/metrics", TypeControllers.getMetrics);

module.exports = router;
