const path = require('path');
const readFile = require('../utils/read-file');

const filePath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(filePath)
    .then((cardsData) => res.send(cardsData))
    .catch((err) => {
      console.log(err);
      res.status(505).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = getCards;
