// test unitaire des fonctions de tirages
// tarotControllers.test.js


// Importe les fonctions à tester depuis tarotController.js
const { drawCards, drawRandomCards } = require('../controllers/tarotControllers');

// Tests pour drawCards
test('drawCards renvoie un tirage de tarot avec trois cartes', () => {
    // Mock Express request et response objects
    const req = null;
    const res = {
        json: jest.fn()
    };

    // Appelle drawCards
    drawCards(req, res);

    // Vérifie si la réponse contient les clés attendues
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Tirage de tarot effectué avec succès',
        cards: expect.arrayContaining([
            expect.any(Object),
            expect.any(Object),
            expect.any(Object)
        ])
    }));
});

// Tests pour drawRandomCards
test('drawRandomCards renvoie un tirage de tarot aléatoire avec une seule carte', () => {
    // Mock Express request et response objects
    const req = null;
    const res = {
        json: jest.fn()
    };

    // Appelle drawRandomCards
    drawRandomCards(req, res);

    // Vérifie si la réponse contient les clés attendues
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Tirage de tarot aléatoire effectué avec succès',
        card: expect.any(Object)
    }));
});
