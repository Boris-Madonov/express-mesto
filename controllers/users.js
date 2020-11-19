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

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    return res.send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Передан некорректный id' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    });

    return res.send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
