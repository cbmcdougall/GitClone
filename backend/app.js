const express = require('express');
const cors = require('cors');
const helpers = require('./helpers'); // helper functions

// Define the server
const app = express();
app.use(express.json());
app.use(cors());

// Retrieve the data file. Any changes made to "data" will be made to this variable's stored data, not the original data.json
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
    const emoji = req.params.emoji;
    // Index of each post in the data is 1 less than their id
    const postIndex = userRequest.id - 1;
    // Check what emoji is to be adjusted
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
    // Get new emoji count
    const response = helpers.adjustEmoji(emojiToAdjust, userRequest.adjust);
    // Store new emoji count
    data[postIndex][emoji] = response.emojiCount;
    // Return status, message, and new emoji count
    res.status(response.status).json(response);
  } catch (err) {
    res.status(err.status || 500).send(`Unable to complete request, ${err}. ${postIndex}`);
  }
})

// Delete post of given id
app.delete('/gitrm/:id', (req, res) => {
  try {
    // Get Id of post to delete
    const postId = req.params.id;
    // Delete the post
    const result = helpers.deletePost(data, postId);
    res.status(200).send(result)
  } catch (err) {
    res.status(err.status || 500).send(`Unable to complete request, ${err}`);
  }
})

// Delete comment of given id
app.delete('/gitrm/:postId/comment/:id', (req, res) => {
  try {
    // Get id of post containing comment to delete
    const postId = req.params.postId;
    // Get id of comment to delete
    const commentId = req.params.id;
    // Delete the comment
    const result = helpers.deleteComment(data, postId, commentId);
    res.status(200).send(result)
  } catch (err) {
    res.status(err.status || 500).send(`Unable to complete request, ${err}`);
  }
})

module.exports = app;