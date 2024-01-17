const {Review, User, Product} = require ("../db/db")

const ReviewsServices = {
  getAllReviews: async () => {
    try {
      const reviews = await Review.findAll();
      return reviews;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching Rwviews");
    }
  },
  
  createReview: async (reviewData) => {
    try {
        const { UserId, ProductId } = reviewData;

        const user = await User.findByPk(UserId);
        const product = await Product.findByPk(ProductId);

        if (!user || !product) {
          throw new Error("User or Product not found");
        }

        const existingReview = await Review.findOne({
          where: { UserId: UserId,
            ProductId: ProductId },
        });

        if (existingReview) {
          throw new Error('Ya has realizado una revisión para este producto.');
        }
        console.log(reviewData)
        const newReview = await Review.create(reviewData);
        return newReview
    } catch (error) {
        console.error(error)
        throw new Error ("Error creating Review")
    }
},

  deleteReview: async (id) => {
    try {
      const response = await Review.findByPk(id);
      if (!response) {
        throw new Error("Review not found");
      }
      await response.update({ isActive: false });

      return "Review not Active";
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching review");
    }
  },

  getTopRatedProducts: async () => {
    try {
      const allProducts = await Product.findAll({
        include: [
          {
            model: Review,
            attributes: ["id", "rating"],
          },
        ],
      });

      const productsWithReviews = allProducts.filter((product) => product.Reviews.length > 0);

      // Calcular el promedio de calificaciones y ordenar de mayor a menor
      const sortedProducts = productsWithReviews.sort((a, b) => {
        const avgRatingA = a.Reviews.reduce((sum, review) => sum + review.rating, 0) / a.Reviews.length;
        const avgRatingB = b.Reviews.reduce((sum, review) => sum + review.rating, 0) / b.Reviews.length;
        return avgRatingB - avgRatingA;
      });

      const topRatedProducts = sortedProducts.slice(0, 10);

      return topRatedProducts;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching top-rated products");
    }
  },
};

module.exports = ReviewsServices;
