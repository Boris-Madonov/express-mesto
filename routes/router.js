const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const notFoundHandler = require('../controllers/notFoundHandler');
const {
  getUsers,
  getCurrentUser,
  setUserInfo,
  setUserAvatar,
  createUser,
  login,
} = require('../controllers/users');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

router.use(auth);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30),
    about: Joi.string().max(30),
  }),
}), setUserInfo);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), setUserAvatar);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().max(30),
  }),
}), createCard);
router.get('/users', getUsers);
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/likes/:cardId', likeCard);
router.delete('/cards/likes/:cardId', dislikeCard);
router.all('*', notFoundHandler);

module.exports = router;
