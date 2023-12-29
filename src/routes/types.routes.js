const { Router } = require("express");
const router = Router();

const TypeControllers = require("../controllers/types.controllers");

router.get("/", TypeControllers.getAllTypesInStock);
router.get("/all", TypeControllers.getAllTypes);
router.get("/withSubtypes", TypeControllers.getTypesWithSubtypes);

module.exports = router;
