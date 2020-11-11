const router = require('express').Router();
const error = require('../controllers/error');
const {
  getUsers,
  getUser,
} = require('../controllers/users');
const getCards = require('../controllers/cards');

router.use('/users/:_id', getUser);
router.use('/users', getUsers);
router.use('/cards', getCards);
router.use('*', error);

module.exports = router;
