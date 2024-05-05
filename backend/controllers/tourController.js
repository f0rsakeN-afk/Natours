/* const fs = require('fs'); */
const Tour = require('./../model/tourModel');
/* const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); */

/* exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  }
  next();
}; */
/* 
exports.checkBody = (req, res, next) => {
  if (!req.body.name || req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing name or price',
    });
  }
  next();
}; */

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    /*    results: tours.length,
       data: {
         tours,
       }, */
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  /* const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  }); */
};

exports.createTour = async (req, res) => {
  /*   const newTour = new Tour({});
    newTour.save(); */

  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  }
};

exports.updateTour = (req, res) => { };

exports.deleteTour = (req, res) => { };

