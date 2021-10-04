const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')


let journals = [
  {
    title:'My First Post',
    body: 'blahblahblah',
    timeCreated: 'timestamp',
    comments: [
      {
        body:'Nice one!',
        timeCreated: 'timestamp',
      },
      {
        body:'Great!',
        timeCreated: 'timestamp',
      }
    ]
  }
]



app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})


// app.get('/posts', (req, res) => {
//   let weatherResult = weather[req.query.city]
//   if (weatherResult) {
//     res.send(weatherResult)
//   } else {
//     res.send('Post not found')}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
