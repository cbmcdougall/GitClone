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
  const userPost = req.body;

  // Create the new post
  const newPost = addPost(data, userPost)
  res.status(201).json(newPost)
})

// Add new comment to blog post
app.put('/gitpush/comment', (req, res) => {
  const userComment = req.body;
  const newComment = addComment(data, userComment);
  res.status(201).json(newComment)
})

// Adjust emoji count in post
app.put('/gitpush/:emoji', (req, res) => {
  const userRequest = req.body;
  const postIndex = userRequest.id - 1;
  const emoji = req.params.emoji;
  switch (emoji) {
    case "thumbsUp":
      emojiToAdjust = data[postIndex].thumbsUp
      break;
    case "thumbsDown":
      emojiToAdjust = data[postIndex].thumbsDown
      break;
    case "laughing":
      emojiToAdjust = data[postIndex].laughing
      break;
    default:
      res.status(404).send("Please specify /thumbsUp, /thumbsDown, or /laughing in fetch url")
      return;
  };
  const response = adjustEmoji(emojiToAdjust, userRequest.adjust);
  data[postIndex][emoji] = response[2];
  res.status(response[0]).send(response[1]);
})

function addPost(data, inputData){
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
    "laughing": "0",
    "comments": []
  }
  
  // Note: data is only added in local session
  // Closing and restarting server will reset the data
  data.push(newPost);
  
  // Return the added data
  return newPost;
}

function addComment(data, inputData){
  // Find the relevant post
  post = data[inputData.id-1];  // Post ids start at 1
  
  // Create new comment data
  commentDate = new Date().toLocaleDateString()
  newComment = {
    "body": `${inputData.body}`,
    "dateAdded": `${commentDate}`
  }
  
  // Add comment to data
  post.comments.push(newComment); // Note change is local
  
  return newComment;
}

function adjustEmoji(emoji, adjust){
  let status = 200;
  if (adjust==="add"){
    emoji++;
    message = 'Emoji has been added';
  } else if (adjust==="remove"){
    emoji--;
    message = 'Emoji has been removed';
  } else {
    message = 'adjust must be "add" or "remove"';
    status = 400;
  }
  return [status, message, emoji];
}

module.exports = app;