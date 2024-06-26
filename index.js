const express = require('express');
const { connect, disconnect } = require("mongoose");
const cors = require("cors");
const { userRouter } = require('./routes/usersRoutes');
const { storyRouter } = require('./routes/storyRoutes');

const app = express();
app.use(cors());
// Приложение использует json для обмена данными
app.use(express.json());

app.use('/users', userRouter);
app.use('/story', storyRouter);

const main = async () => {
    try{
        await connect("mongodb://127.0.0.1:27017/novel");
        app.listen(3000);
        console.log("Сервер ожидает подключения");
    }
    catch(err){
        return console.log(err);
    }
}

main();

process.on("SIGINT", async() => {
    await disconnect();
    console.log("Приложение завершило работу");
    process.exit();
})