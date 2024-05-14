const { User } = require('../models/userModel');
const { hash, compare } = require("bcrypt");

const registration = async (req, res) => {
    // Проверка на то, что данные пришли
    if(!req.body) return res.status(400).json({error : "Нет данных"});
    // Получение данных из тела
    const { email, password, name } = req.body;
    // Проверка что такого пользователя еще нет в базе
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({error : "Такой пользователь уже есть"});
    // Шифрование пароля
    const hashedPassword = await hash(password, 10);
    // Создание нового пользователя и его сохранение
    const user = new User({ email, password : hashedPassword, name });
    await user.save();
    // Ответ от сервера
    return res.status(201).json({message : "Регистрация успешно завершена"});
}

const authorization = (req, res) => {
    return res.status(200).json({message : "Авторизация"})
}

module.exports = {
    registration,
    authorization
}