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

  module.exports = {
      addPost,
      addComment,
      adjustEmoji
  }