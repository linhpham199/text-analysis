# text-analysis
[![Build Status](https://travis-ci.org/linhpham199/text-analysis.svg?branch=master)](https://travis-ci.org/linhpham199/text-analysis)

This is an [API endpoint](https://text-analysis-linh.herokuapp.com/analyze) with method POST for analyzing text.

##### Curl command example:

```(curl)
 curl -d '{"text": "Hello there, try this "}'-H "Content-Type: application/json" -X POST https://text-analysis-linh.herokuapp.com/analyze
```

##### Response example:

```
{
  "textLength": {
    "withSpaces":22,
    "withoutSpaces":18
  },
  "wordCount":4,
  "characterCount":[
    {"e":3},
    {"h":3},
    {"i":1},
    {"l":2},
    {"o":1},
    {"r":2},
    {"s":1},
    {"t":3},
    {"y":1}
   ]
 }
```

The application was built with Node.js and Express.js, tested with Jest. Moreover, Travis CI was used in the application to automatically test code changes and automatically deploy to Heroku.

* [Travis CI](https://travis-ci.org/linhpham199/text-analysis) <br/>
* [Heroku](https://text-analysis-linh.herokuapp.com/analyze)
