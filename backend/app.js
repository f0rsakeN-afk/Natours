const express = require('express');
const port = 3000;
const app = express();
app.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`);
});
