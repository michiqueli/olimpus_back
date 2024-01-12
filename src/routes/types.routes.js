const { Router } = require("express");
const router = Router();

const TypeControllers = require("../controllers/types.controllers");

router.get("/", TypeControllers.getAllTypes);
router.post("/subTypes", TypeControllers.getSubTypes);
router.post("/subTypes/metrics", TypeControllers.getMetrics);

module.exports = router;
