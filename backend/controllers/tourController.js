/* const fs = require('fs'); */
const Tour = require('./../model/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
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
}; 2
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

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}


exports.getAllTours = async (req, res) => {
  try {
    //Build the query
    //1. Filtering
    /*     const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);
        //2.Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
        let query = Tour.find(JSON.parse(queryStr));
     */

    /*const query = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy'); */


    //3.Sorting
    /*   if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
        //sort('price ratingsAverage')
      } else {
        query = query.sort('-createdAt')
      } */


    //4. field limiting
    /*  if (req.query.fields) {
       const fields = req.query.fields.split(',').join(' ');
       query = query.select('fields');
     } else {
       query = query.select('-__v');
     } */



    //5.Pagination
    /* const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;



    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numberOfTours = await Tour.countDocuments();
      if (skip >= numberOfTours) throw new Error('This page does not exist');
    } */

    //execute the query

    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
    const tours = await features.query;

    //send responses
    res.status(200).json({
      status: 'success',
      results: tours.length,
      requestedAt: req.requestTime,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
};

exports.getTour = async (req, res) => {
  /*   console.log(req.params);
    const id = req.params.id * 1; */
  /* const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  }); */
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
}


exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: {
          ratingsAverage: { $gte: 4.5 }
        }


      }, {
        $group: {
          _id: { $toUpper: '$difficulty' },
          num: { $sum: 1 },
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }, {
        $sort: {
          avgPrice: 1
        }
      }/* , {
        $match: { _id: { $ne: 'EASY' } }
      } */
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
}



exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = Tour.aggregate([
      {
        $unwind: '$startDates'
      }, {
        $match: {
          startDates: {
            $gte: new Date(`${year}-0-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      }, {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addField: {
          month: '$_id'
        }
      }, {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {
          numTourStarts: -1
        }
      }, 
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'failed',
      data: {
        plan
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
}