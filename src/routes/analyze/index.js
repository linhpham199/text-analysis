import express from 'express'

const analyze = express.Router()

analyze.post('/', (req, res, next) => {
  console.log(req.body.text)

  if (req.body.text) {
    let response = {
      textLength: {
        withSpace: null,
        withoutSpace: null
      },
      wordCount: null,
      characterCount: []
    }
  
    const text = req.body.text

    const wordCount = (str) => (
      str.split(' ').filter(word => word !== '').length
    )
    
    const characterCount = (str) => {
      const lowerCaseStr = str.toLowerCase()
      const charArray = [...lowerCaseStr].filter(char => char.match(/[a-zA-Z]/g)).sort()
      const count = charArray.reduce((result, char) => ({
        ...result,
        [char]: (result[char] || 0) + 1
      }), {})

      const countArray = Object.keys(count).map(char => ({[char]: count[char]}) )
      return countArray
    }

    response = {
      ...response,
      textLength: {
        ...response.textLength,
        withSpace: text.length,
        withoutSpace: text.replace(/\s/g,'').length
      },
      wordCount: wordCount(text),
      characterCount: characterCount(text)
    }
  
    res.json(response)
  } else {
    res.json({ error: 'Input must be: {text: string}' })
  }
 
})

export default analyze