const express = require('express');


const app = express();

app.use((req, res) => {
    res.end("I'm working");
})

app.listen(3000);