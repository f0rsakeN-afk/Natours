const mongoose = require('mongoose')
const tourSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 4.5,
    },
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
});

const Tour = mongoose.model('Tour', tourSchema);


module.exports = Tour;