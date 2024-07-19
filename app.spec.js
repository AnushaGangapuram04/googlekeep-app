const request = require('supertest');
const babel = require('@babel/polyfill');
const app =require('./app.js');

describe('API', () => {
  let cardList;
  beforeEach(() => {
    cardList = [
      { 
        id: 0, 
        title: 'test', 
        content: [
          {
            id: 2,
            type: 'string',
            text: 'sample string',
            checked: null
          }
        ]
      },
    ]
    app.locals.cardList = cardList
  })

  describe('GET /api/v1/cardList', () => {
    it('should have a status of 200', async() => {
      const response = await request(app).get('/api/v1/cardList')

      expect(response.statusCode).toBe(200)
    })

    it.skip('should return an array of cards', async() => {
      const response = await request(app).get('/api/v1/cardList')
      expect(response.body).toEqual(cardList)
    })

    it('should return a status of 404 if card is not found', async() => {
      const response = await request(app).get('/api/v1/cardLis')

      expect(response.statusCode).toBe(404)
    })

    it.skip('should respond with the correct card if it exists', async() => {
      const response = await request(app).get('/api/v1/cardList/')
      const expected = cardList
      // console.log(response.body)
      expect(response.body).toEqual(expected)
    })

    it('should respond with a status code if card doesnt exist', async() => {
      
    })

    it('should return an error message', async() => {

    })
  })

  describe('POST /api/v1/cardList', () => {

    it('should return a status of 201 and a new card', async () => {

    })

    it('should return a 422 status code and error message if not ok', async () => {

    })

    it('should return a status of 204 if card is updated', async() => {
      
    })
  })
})