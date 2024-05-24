const { Router } = require('express');
const { getStory, addFrame } = require('../controllers/storyController');

const storyRouter = Router();

storyRouter.get('/', getStory);
storyRouter.post('/', addFrame);

module.exports = {
    storyRouter
}