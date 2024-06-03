const { Router } = require('express');
const { registration, authorization, me, save, getSaves } = require('../controllers/usersController');
const { auth } = require("../middlewares/auth");

const userRouter = Router();

// к пути(маршруту) регистрации подключается функция регистрации. с авториз. тоже самое
userRouter.post('/registration', registration);
userRouter.post('/authorization', authorization);
userRouter.post('/save', auth, save);
userRouter.get('/saves', auth, getSaves);
userRouter.get('/me', auth, me);

module.exports = {
    userRouter
}