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

const createCard = async (req, res) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
      likes: req.body.likes,
      createdAt: req.body.createdAt,
    });

    return res.send(card);
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }
    card.deleteOne();

    return res.send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({ message: 'Передан некорректный id' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
