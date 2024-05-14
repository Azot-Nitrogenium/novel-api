const { Router } = require('express');
const { registration, authorization, me } = require('../controllers/usersController');
const { auth } = require("../middlewares/auth");

const userRouter = Router();

userRouter.post('/registration', registration);
// к пути(маршруту) регистрации подключается функция регистрации. с авториз. тоже самое
userRouter.post('/authorization', authorization);
userRouter.get('/me', auth, me);

module.exports = {
    userRouter
}