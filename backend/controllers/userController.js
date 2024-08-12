//const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
/* const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
); */
const User = require('./../model/userModel')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const userData = await User.find();
  res.status(200).json({
    status: 'success',
    results: userData.length,
    data: {
      userData
    },
  })
})


exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({
    status: success,
    data: {
      user
    }
  })
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  })
})