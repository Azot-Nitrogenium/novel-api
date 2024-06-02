const { Router } = require('express');
const { getStory, addFrame, addWay } = require('../controllers/storyController');

const storyRouter = Router();

storyRouter.get('/', getStory);
storyRouter.post('/', addFrame);
storyRouter.put('/', addWay);

module.exports = {
    storyRouter
}