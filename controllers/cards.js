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
      return res.status(400).send({ message: error.message });
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

// eslint-disable-next-line consistent-return
const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(400).send({ message: 'Нет карточки с таким id' });
    }
    card.deleteOne();

    res.send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Передан некорректный id' });
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
