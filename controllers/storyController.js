const { Frame } = require("../models/frameModel");

const getStory = async (req, res) => {
    // const storyFile = require("../story.json");
    // const story = JSON.stringify(storyFile);
    // res.status(200).json({ story });
    const story = Frame.find();
    console.log(story);
    return res.status(200).json({ story });
}

const addFrame = async (req, res) => {
    if(!req.body) return res.status(400).json({error : "Нет данных"});
    const { type, text, background, heroes = [], way = "", answers = [] } = req.body;
    if(!type) return res.status(400).json({error : "Отсутствует тип"});
    if(type === "history"){
        if(!text || !background) return res.status(400).json({error : "Отсутствуют нужные поля"});
        const frame = new Frame({ type, text, background, heroes, way });
        await frame.save();
        return res.status(201).json({message : "Слайд успешно добавлен"});
    }
    else if(type === "dialog"){
        if(!text || !background || !answers) return res.status(400).json({error : "Отсутствуют нужные поля"});
        const frame = new Frame({ type, text, background, heroes, answers });
        await frame.save();
        return res.status(201).json({message : "Слайд успешно добавлен"});
    }
}

module.exports = {
    getStory,
    addFrame
}