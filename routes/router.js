const router = require('express').Router();
const error = require('../controllers/error');
const {
  getUsers,
  getUser,
} = require('../controllers/users');
const getCards = require('../controllers/cards');

router.get('/users/:_id', getUser);
router.get('/users', getUsers);
router.get('/cards', getCards);
router.all('*', error);

module.exports = router;
