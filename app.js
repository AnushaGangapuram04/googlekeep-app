const express = require('express');
const app = express();

// Dummy data
app.locals.cardList = [
  { 
    id: 0, 
    title: 'Welcome to Sticky Do\'s', 
    content: [
      {
        id: 1,
        type: 'note',
        text: 'This is a standard note. Which is the default when you start typing in our input box ⤴️',
        checked: null
      }
    ]
  },
  { 
    id: 2, 
    title: 'Example #2', 
    content: [
      {
        id: 1,
        type: 'list',
        text: 'This is a list item. If you click the ☑️ button in the input box',
        checked: false
      },
      {
        id: 2,
        type: 'list',
        text: 'You can add as many checklist items as you would like!',
        checked: true
      }
    ]
  }
];

// POST /api/v1/cardList
app.post('/api/v1/cardList', (request, response) => {
  const cardList = request.body;
  if (!cardList) {
    return response.status(422).send({
      error: 'No data provided'
    });
  }
  app.locals.cardList.push({ ...cardList });
  return response.status(201).json({ ...cardList });
});

// GET /api/v1/cardList
app.get('/api/v1/cardList', (request, response) => {
  const cardList = app.locals.cardList;
  return response.json({ cardList });
});

// DELETE /api/v1/cardList/:id
app.delete('/api/v1/cardList/:id', (request, response) => {
  const cardIndex = app.locals.cardList.findIndex(card => card.id == request.params.id);
  if (cardIndex === -1) return response.status(404).json('Card not found');
  app.locals.cardList.splice(cardIndex, 1);
  return response.sendStatus(204);
});

// PUT /api/v1/cardList/:id
app.put('/api/v1/cardList/:id', (request, response) => {
  const { title, content } = request.body;
  let { id } = request.params;
  let { cardList } = app.locals;

  id = parseInt(id);
  let cardFound = false;
  const updatedCards = cardList.map(card => {
    if (card.id === id) {
      cardFound = true;
      return { id, title, content };
    } else {
      return card;
    }
  });

  if (!title || !content) return response.status(422).json('Missing title or content');
  if (!cardFound) return response.status(404).json('Card not found');

  app.locals.cardList = updatedCards;
  return response.sendStatus(204);
});

module.exports = app;
