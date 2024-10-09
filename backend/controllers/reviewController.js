const catchAsync = require('../utils/catchAsync');
const Review = require('../model/reviewModal');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find()
    .populate('tour', 'name')
    .populate('user', 'name photo')
    .lean();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {12
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status:'success',
    data:{
      newReview
    }
  })
});
