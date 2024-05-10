const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((con) => {
    console.log(con.connections);
    console.log('DB connections successful');
  });




const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
