const { Router } = require('express');
const { registration, authorization } = require('../controllers/usersController');

const userRouter = Router();

userRouter.post('/registration', registration);
// к пути(маршруту) регистрации подключается функция регистрации. с авториз. тоже самое
userRouter.post('/authorization', authorization);

module.exports = {
    userRouter
}