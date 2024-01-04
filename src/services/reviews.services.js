const {Review} = require ("../db/db")

const ReviewsServices = {

    getAllReviews: async () => {
        try {
            const reviews = await Review.findAll()
            return reviews
        } catch (error) {
            console.error(error)
            throw new Error ("Error fetching Rwviews")
        }
    },

    createReview: async (reviewData) => {
        try {
            const newReview = await Review.create(reviewData)
            return newReview
        } catch (error) {
            console.error(error)
            throw new Error ("Error creating Rwview")
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