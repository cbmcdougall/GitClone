const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const data = require('./data.json');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/pushes', (req,res) => {
//   res.json(data);
// })

// Retrieve all the blog posts
app.get('/pushes', (req,res) => {
  fs.readFile('./data.json', 'utf-8', (err, jsonString) => {
    if (err) {
      console.log(`Error reading file: ${err}`);
      return
    }
    try {
      const data = JSON.parse(jsonString);
      res.json(data);
    } catch(err) {
      console.log(`Error parsing JSON string: ${err}`);
    }
  })
  
})

module.exports = app;