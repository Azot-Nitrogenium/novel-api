const { verify } = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Попытка авторизации, токен = ", token);
    if(!token) return res.status(403).json({error : "Ошибка авторизации"});

    const secret = process.env.SECRET_KEY || "secret";
    try{
        const payload = verify(token, secret);
        console.log("Авторазиция прошла успешно", payload);
        req.user = payload;
        next();
    }
    catch(err){
        return res.status(403).json({error : "Ошибка авторизации (инвалидный токен)"});
    }

}

module.exports = {
    auth
}