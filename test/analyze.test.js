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

const errorResult = {
  error: 'Input must be: {text: string}'
}

describe('analyzing', () => {
  test('an empty input', () => {
    const input = {}
    
    sendRequest(input, errorResult)
  })

  test('a wrong input field', () => {
    const input = {key1: 'value'}

    sendRequest(input, errorResult)
  })

  test('an empty string', async () => {
    const input = {text: ''}

    sendRequest(input, errorResult)
  })

  test('a normal string', () => {
    const input = {text: 'Hello haha hehe 2'}

    const result = {
      textLength: {
        withSpace: 17,
        withoutSpace: 14
      },
      wordCount: 4,
      characterCount: [
        {H: 1}, {e: 3}, {l: 2}, {o: 1}, {h: 4}, {a: 2}
      ]
    }

    sendRequest(input, result)
  })

  test('a string with extra spaces', () => {
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
})