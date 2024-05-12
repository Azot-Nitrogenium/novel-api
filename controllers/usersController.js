const { userModel } = require('../models/userModel');

const registration = (req, res) => {
    return res.status(200).json({message : "Регистрация"})
}

const authorization = (req, res) => {
    return res.status(200).json({message : "Авторизация"})
}

module.exports = {
    registration,
    authorization
}