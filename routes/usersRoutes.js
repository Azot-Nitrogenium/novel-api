const { Router } = require('express');
const { registration, authorization, me } = require('../controllers/usersController');
const { auth } = require("../middlewares/auth");

const userRouter = Router();

// к пути(маршруту) регистрации подключается функция регистрации. с авториз. тоже самое
userRouter.post('/registration', registration);
userRouter.post('/authorization', authorization);
userRouter.get('/me', auth, me);

module.exports = {
    userRouter
}