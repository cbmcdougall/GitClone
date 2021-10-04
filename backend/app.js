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

module.exports = app;