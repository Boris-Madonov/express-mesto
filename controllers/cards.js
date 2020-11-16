const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// eslint-disable-next-line consistent-return
const createCard = async (req, res) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
      likes: req.body.likes,
      createdAt: req.body.createdAt,
    });

    res.send(card);
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return res.status(404).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// eslint-disable-next-line consistent-return
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);

    res.send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).send({ message: 'Передан некорректный id' });
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
