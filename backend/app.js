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
  res.send('Visit /pushes to get all the blog posts!')
})

// Retrieve all the blog posts
app.get('/pushes', (req,res) => {
  if(typeof data !== 'undefined'){
    // data exists
    res.json(data);
  } else {
    res.status(404).send("Blog posts not found");
  };
})

// Add new blog post
app.put('/gitpush', (req, res) => {
  try {
    // Get user submission
    const userPost = req.body;
    // Create the new post
    const newPost = helpers.addPost(data, userPost)
    res.status(201).json(newPost)
  } catch (err) {
    res.status(err.status || 500).send(`Unable to complete request, ${err}`);
  }
})

// Add new comment to blog post
app.put('/gitpush/comment', (req, res) => {
  try {
    const userComment = req.body;
    const newComment = helpers.addComment(data, userComment);
    res.status(201).json(newComment)
  } catch (err) {
    res.status(err.status || 500).send(`Unable to complete request, ${err}`);
  }
})

// Adjust emoji count in post
app.put('/gitpush/:emoji', (req, res) => {
  try {
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
  } catch (err) {
    res.status(err.status || 500).send(`Unable to complete request, ${err}`);
  }
})

module.exports = app;