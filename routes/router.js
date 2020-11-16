const router = require('express').Router();
const error = require('../controllers/error');
const {
  getUsers,
  getUser,
  createUser,
} = require('../controllers/users');
const {
  getCards,
  createCard,
  deleteCard,
} = require('../controllers/cards');

router.get('/users/:userId', getUser);
router.get('/users', getUsers);
router.get('/cards', getCards);
router.post('/users', createUser);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.all('*', error);

module.exports = router;
