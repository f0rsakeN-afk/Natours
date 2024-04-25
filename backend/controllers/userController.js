const fs = require('fs');
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};
exports.createUser = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'no content',
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id ;
  const user = users.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'no content',
  });
};

exports.deleteUser = (req, res) => {
  res.status(204).json({
    status: 'failed',
    message: 'no content',
  });
};
