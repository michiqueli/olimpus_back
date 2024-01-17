const {Review, User, Product} = require ("../db/db")

const ReviewsServices = {

    getAllReviews: async () => {
        try {
            const reviews = await Review.findAll()
            return reviews
        } catch (error) {
            console.error(error)
            throw new Error ("Error fetching Reviews")
        }
    },

    createReview: async (reviewData) => {
        try {
            const { userId, productId } = reviewData;

            const user = await User.findByPk(userId);
            const product = await Product.findByPk(productId);

            if (!user || !product) {
              throw new Error("User or Product not found");
            }

            const existingReview = await Review.findOne({
              where: { userId, productId },
            });
      
            if (existingReview) {
              throw new Error('Ya has realizado una revisión para este producto.');
            }

            const newReview = await Review.create(reviewData);
            return newReview
        } catch (error) {
            console.error(error)
            throw new Error ("Error creating Review")
        }
    },

    deleteReview: async(id) =>{
        try {
          const response = await Review.findByPk(id)
          if (!response) {
            throw new Error ('Review not found')
          }
          await response.update({ isActive: false })
    
          return 'Review not Active'
    
        } catch (error) {
          console.error(error)
          throw new Error('Error fetching review')
        }
      },
}

module.exports = ReviewsServices