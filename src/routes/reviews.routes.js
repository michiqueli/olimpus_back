const { Router } = require("express");
const router = Router();
const ReviewsControllers = require("../controllers/reviews.controllers");

router.get("/", ReviewsControllers.getAllReviews) //Tare Todas las Reviews (para AdminDashboard quiza)
router.post("/createReview", ReviewsControllers.createReview) //Crea una Review, se asocia al producto y al usuario
router.patch("/deleteReview/:id", ReviewsControllers.deleteReview) // desactiva una review pasa el estado isActive a False

module.exports = router;