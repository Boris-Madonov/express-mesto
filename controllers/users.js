const path = require('path');
const readFile = require('../utils/read-file');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(filePath)
    .then((usersData) => res.send(usersData))
    .catch((err) => {
      console.log(err);
      res.status(505).send({ message: 'Ошибка на сервере' });
    });
};

const getUser = (req, res) => {
  readFile(filePath)
    .then((usersData) => usersData.find((user) => user._id === req.params._id))
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(505).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUser,
};
