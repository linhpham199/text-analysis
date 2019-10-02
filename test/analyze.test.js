import analyze from '../src/routes/analyze'
import app from '../src'
import request from 'supertest'

const sendRequest = async (input, result) => {
  const response = await request(app)
  .post('/analyze')
  .send(input)
  .then(res => JSON.parse(res.text))

  expect(response).toEqual(expect.objectContaining(result))  
}

describe('analyzing', () => {

  test('an empty text', async () => {
    const input = {text: ''}

    const result = {
      textLength: {
        withSpace: 0,
        withoutSpace: 0
      },
      wordCount: 0,
      characterCount: []
    }

    sendRequest(input, result)
  })

  test('text with one word', () => {
    const input = {text: 'Hello'}

    const result = {
      textLength: {
        withSpace: 5,
        withoutSpace: 3
      },
      wordCount: 1,
      characterCount: [
        {e: 1}, {h: 1}, {l: 2}, {o: 1}
      ]
    }

    sendRequest(input, result)
  })

  test('text with trailing spaces', () => {
    const input = {text: '  Hello  haha hehe 2 '}

    const result = {
      textLength: {
        withSpace: 21,
        withoutSpace: 14
      },
      wordCount: 4,
      characterCount: [
        {H: 1}, {e: 3}, {l: 2}, {o: 1}, {h: 4}, {a: 2}
      ]
    }

    sendRequest(input, result)  
  })

  test('text with two words', () => {
    const input = {text: 'Haha, hihi'}

    const result = {
      textLength: {
        withSpace: 10,
        withoutSpace: 9
      },
      wordCount: 2,
      characterCount: [
        {a: 2}, {h: 4}, {i: 2}
      ]
    }

    sendRequest(input, result)  
  })
})