function addPost(data, inputData){
    // Create new post data
    const newId = data.length + 1;
    const postDate = new Date().toLocaleDateString('en-GB') // Should produce date in DD/MM/YYYY format
    const newPost = {
      "id": `${newId}`,
      "title": `${inputData.title}`,
      "text": `${inputData.text}`,
      "gifUrl": `${inputData.gifUrl}`,
      "date": `${postDate}`,
      "thumbsUp": "0",
      "thumbsDown": "0",
      "laughing": "0",
      "comments": []
    }
    
    // Append post to the data
    data.push(newPost);
      // Note: data is only added in local session
      // Closing and restarting server will reset the data
    
    // Return the data for the post that was added
    return newPost;
}
  
function addComment(data, inputData){
    // Find the relevant post
    const post = data[inputData.id-1];  // Post ids start at 1
    
    // Create new comment data
    const commentId = post.comments.length + 1;
    const commentDate = new Date().toLocaleDateString('en-GB')
    const newComment = {
      "id": `${commentId}`,
      "body": `${inputData.body}`,
      "dateAdded": `${commentDate}`
    }
    
    // Add comment to data
    post.comments.push(newComment);
    
    return newComment;
}
  
function adjustEmoji(emoji, adjust){
    let status = 200;
    let message = "";
    // Check whether to increment or decrement emoji count
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
    // Return status code, server return message, and new emoji count
    const response = {
      "status": `${status}`
      "message": `${message}`,
      "emojiCount": `${emoji}`
    }
    return response;
}

function deletePost(data, postId, id){
  const postIndex = postId - 1;
  // Delete the specified post
  data.splice(postIndex, 1);
  // Update IDs of posts created later than the deleted post
  for (let i = postIndex; i < data.length; i++){
    data[i].id = i+1;
  }
  return `Post #${id} successfully deleted`
}

function deleteComment(data, postId, id){
  const postIndex = postId - 1;
  const commentIndex = id - 1;
  // Delete the specified comment
  const post = data[postIndex];
  post.comments.splice(commentIndex, 1);
  // Update IDs of later comments
  for (let i = commentIndex; i < post.comments.length; i++){
    post.comments[i].id = i+1;
  }
}

module.exports = {
      addPost,
      addComment,
      adjustEmoji,
      deletePost,
      deleteComment
}