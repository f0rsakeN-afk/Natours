const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require(path.resolve(__dirname, './../../model/tourModel'));
dotenv.config({ path: path.resolve(__dirname, './../../config.env') });

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log('DB connection established');
}).catch(err => {
    console.error('Error connecting to database:', err);
});

// Read JSON file
const toursFilePath = path.resolve(__dirname, 'tours.json');
const tours = JSON.parse(fs.readFileSync(toursFilePath, 'utf-8'));

// Import data into database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');
    } catch (err) {
        console.error('Error importing data:', err);
    }
    process.exit();
};

// Delete all data from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');
    } catch (err) {
        console.error('Error deleting data:', err);
    }
    process.exit();
};

if (process.argv[2] === '--import'
) {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);

