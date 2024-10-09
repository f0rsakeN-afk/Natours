const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController=require('../controllers/authController')

router.route('/').get(reviewController.getAllReviews).post(reviewController.createReview)
module.exports = router;
