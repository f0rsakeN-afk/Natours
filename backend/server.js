const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
dotenv.config({ path: './config.env' });

// Add error checking for DATABASE
const DATABASE = process.env.DATABASE;

if (!DATABASE) {
  console.error('DATABASE environment variable is not set');
  process.exit(1);
}

const DB = DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
