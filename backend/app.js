const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// Retrieve the data file
const data = require('./data.json');

// Test home route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Retrieve all the blog posts
app.get('/pushes', (req,res) => {
  res.json(data);
})

// Add new blog post
app.put('/gitpush', (req, res) => {
  // Get user submission
  userPost = req.body;

  // Create the new post
  const newPost = addData(data, userPost)
  res.status(201).json(newPost)
})

function addData(data, inputData){
  // Create new post data
  newId = data.length + 1;
  postDate = new Date().toLocaleDateString()
  newPost = {
    "id": `${newId}`,
    "title": `${inputData.title}`,
    "text": `${inputData.text}`,
    "date": `${postDate}`,
    "thumbsUp": "0",
    "thumbsDown": "0",
    "comments": []
  }

  // Note: data is only added in local session
  // Closing and restarting server will reset the data
  data.push(newPost);
  
  // Return the added data
  return newPost;
}

module.exports = app;