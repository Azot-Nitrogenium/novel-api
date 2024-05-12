const { Router } = require('express');
const { registration, authorization } = require('../controllers/usersController');

const userRouter = Router();

userRouter.get('/registration', registration);
// к пути(маршруту) регистрации подключается функция регистрации. с авториз. тоже самое
userRouter.get('/authorization', authorization);

module.exports = {
    userRouter
}