const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { config } = require("dotenv");
const { User } = require('../models/userModel');

config();

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

const authorization = async (req, res) => {
    // Проверка на то, что данные пришли
    if(!req.body) return res.status(400).json({error : "Нет данных"});
    // Получение данных из тела
    const { email, password } = req.body;
    // Проверка что такой пользователь есть
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({error : "Пользователь не найден"});
    // Проверка пароля на правильность (сравнивает с зашифрованным)
    const isPasswordValid = await compare(password, user.password);
    if(!isPasswordValid) return res.status(401).json({error : "Неверный пароль"});
    // Создание JWT-токена и его отправка в ответ
    const secret = process.env.SECRET_KEY || "secret";
    const token = sign({ id : user._id, name : user.name, email }, secret, { expiresIn : "12h" });
    return res.status(200).json({ token });
}

const me = async (req, res) => {
    if(!req.user) return res.status(403).json({error : "Нет информации"});
    return res.status(200).json({user : req.user});
}

module.exports = {
    registration,
    authorization,
    me
}