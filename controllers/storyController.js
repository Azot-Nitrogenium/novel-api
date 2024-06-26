const { Frame } = require("../models/frameModel");

const getStory = async (req, res) => {
    // const storyFile = require("../story.json");
    // const story = JSON.stringify(storyFile);
    // res.status(200).json({ story });
    const frames = await Frame.find();
    const story = JSON.stringify(frames);
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

const addWay = async (req, res) => {
    if(!req.body) return res.status(400).json({error : "Нет данных"});
    const { from, to } = req.body;
    const frameFrom = await Frame.findById(from);
    const frameTo = await Frame.findById(to);
    if(frameFrom && frameTo){
        frameFrom.way = frameTo._id;
        await frameFrom.save();
        return res.status(201).json({message : "Путь добавлен!"});
    }
    return res.status(404).json({message : "Отсутствуют нужные слайды"});
}

const addAnswerWay = async (req, res) => {
    if(!req.body) return res.status(400).json({error : "Нет данных"});
    const { from, answerId, to } = req.body;
    const frameFrom = await Frame.findById(from);
    const answer = frameFrom.answers.find(ans => ans._id == answerId);
    const frameTo = await Frame.findById(to);
    if(frameFrom && frameTo && answer){
        answer.way = frameTo._id;
        await answer.save();
        await frameFrom.save();
        return res.status(201).json({message : "Путь добавлен!"});
    }
    return res.status(404).json({message : "Отсутствуют нужные слайды"});
}

const deleteFrame = async (req, res) => {
    if(!req.body) return res.status(400).json({error : "Нет данных"});
    const { frame } = req.body;
    const deleted = await Frame.findByIdAndDelete(frame);
    if(!deleted) res.status(404).json({message : "Отсутствует слайд"});
    return res.status(200).json({message : "Удалено"}); 
}

module.exports = {
    getStory,
    addFrame,
    addWay,
    addAnswerWay,
    deleteFrame
}