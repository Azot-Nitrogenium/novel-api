const express = require('express');
const { userRouter } = require('./routes/usersRoutes');

const app = express();
// Приложение использует json для обмена данными
app.use(express.json());

app.use('/users', userRouter);

app.listen(3000);