const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('Unhandled Exception! Shutting down');
  console.log(err.name, err.message);
  process.exit(1);
})


const app = require('./app');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((con) => {
    //console.log(con.connections);
    console.log('DB connections successful');
  });




const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled rejection! Shutting down');
  console.log(err.name, err.message);
  Server.close(() => {
    process.exit(1);
  })
})


