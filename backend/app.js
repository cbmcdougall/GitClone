const express = require('express');
const cors = require('cors');
const helpers = require('./helpers');

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
  const newPost = helpers.addPost(data, userPost)
  res.status(201).json(newPost)
})

// Add new comment to blog post
app.put('/gitpush/comment', (req, res) => {
  const userComment = req.body;
  const newComment = helpers.addComment(data, userComment);
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
  const response = helpers.adjustEmoji(emojiToAdjust, userRequest.adjust);
  data[postIndex][emoji] = response[2];
  res.status(response[0]).send(response[1]);
})

module.exports = app;