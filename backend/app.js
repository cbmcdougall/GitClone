const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const data = require('./data.json');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pushes', (req,res) => {
  res.json(data);
})




// let journals = [
//   {
//     title:'My First Post',
//     body: 'blahblahblah',
//     timeCreated: 'timestamp',
//     comments: [
//       {
//         body:'Nice one!',
//         timeCreated: 'timestamp',
//       },
//       {
//         body:'Great!',
//         timeCreated: 'timestamp',
//       }
//     ]
//   }
// ]
module.exports = app;