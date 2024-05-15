const { Router } = require('express');
const { getStory } = require('../controllers/storyController');

const storyRouter = Router();

storyRouter.get('/', getStory);

module.exports = {
    storyRouter
}