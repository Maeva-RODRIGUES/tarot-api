//test unitaire de la fonction du tirage aléatoire drawCards
// tarotControllers.test.js

const { drawCards } = require('../controllers/tarotControllers');
const tarotData = require('../tarotData.json');

test('Draw cards returns correct JSON response', () => {
    // Mock Express response object
    const res = {
        json: jest.fn()
    };

    // Call drawCards function
    drawCards(null, res);

    // Check if response JSON contains the expected keys
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Tirage de tarot effectué avec succès',
        tarotReading: expect.objectContaining({
            past: expect.stringContaining('You drew'),
            present: expect.stringContaining('You drew'),
            future: expect.stringContaining('You drew')
        })
    }));
});
