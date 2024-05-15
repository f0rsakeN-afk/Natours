const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});


tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
})

//this is document middleware and it runs before .save() command and .create() command
tourSchema.pre('save', function (next) {
    //console.log(this);
    this.slug = slugify(this.name, { lower: true });
    next();
})

//we can have multiple middleware for same hook


tourSchema.post('save', function (doc, next) {
    console.log(doc);
    next();
})
const Tour = mongoose.model('tours', tourSchema);


// query middleware allows us to run functions before and after a certain query is executed
//this keyword will point to the query not the doc
//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } })
    next();
})

module.exports = Tour;
//Types of middlewares
//document query aggregate model

