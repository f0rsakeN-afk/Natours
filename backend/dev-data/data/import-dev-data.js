const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../model/tourModel');
dotenv.config({ path: './../../config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log('DB connection established')
});


//read json file
const tours = jSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//Import data into database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded')
    } catch (err) {
        console.log(err);
    }
};

//delete all data from collection 
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted')
    } catch (err) {
        console.log(err);
    }
}
console.log(process.argv);