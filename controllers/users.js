const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// eslint-disable-next-line consistent-return
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    res.send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).send({ message: 'Передан некорректный id' });
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// eslint-disable-next-line consistent-return
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(404).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
