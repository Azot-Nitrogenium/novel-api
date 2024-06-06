const { Router } = require('express');
const { getStory, addFrame, addWay, addAnswerWay, deleteFrame } = require('../controllers/storyController');

const storyRouter = Router();

storyRouter.get('/', getStory);
storyRouter.post('/', addFrame);
storyRouter.put('/', addWay);
storyRouter.put('/answer', addAnswerWay);
storyRouter.delete('/', deleteFrame);

module.exports = {
    storyRouter
}