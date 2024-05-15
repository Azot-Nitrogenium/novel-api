const getStory = async (req, res) => {
    const storyFile = require("../story.json");
    const story = JSON.stringify(storyFile);
    res.status(200).json({ story });
}

module.exports = {
    getStory
}