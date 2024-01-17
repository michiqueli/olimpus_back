  const ReviewsServices = require("../services/reviews.services");

  const ReviewsControllers = {
    getAllReviews: async (req, res) => {
      try {
        const reviews = await ReviewsServices.getAllReviews();
        res.status(201).json(reviews);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
    },

    createReview: async (req, res) => {
      try {
        const { UserId, ProductId } = reviewData;

        const user = await User.findByPk(UserId);
        const product = await Product.findByPk(ProductId);

        if (!user || !product) {
          throw new Error("User or Product not found");
        }

        const existingReview = await Review.findOne({
          where: { UserId, ProductId },
        });

        if (existingReview) {
          throw new Error('Ya has realizado una revisión para este producto.');
        }

        const newReview = await Review.create(reviewData);
        return newReview
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error");
      }
    },

    deleteReview: async (req, res) => {
      const { id } = req.params;
      try {
        const review = await ReviewsServices.deleteReview(id);
        res.status(201).json(review);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    getTopRatedProducts: async (req, res) => {
      try {
        const topRatedProducts = await ReviewsServices.getTopRatedProducts();
        res.status(200).json(topRatedProducts);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    },
  };

  module.exports = ReviewsControllers;
