// On comment form submission, adds new comment to blog post
const commentForm = document.getElementById("comment-form")
commentForm.addEventListener("submit", addNewComment);

function addNewComment(e) {
    e.preventDefault();
    const post = JSON.parse(sessionStorage.journalPost);
    // Get the form data
    const commentText = e.target["comment-here"].value;
    // Get the post id
    const postId = post.id;
    // Define the required body for the PUT request to server
    const addComment = {id: `${postId}`, body: `${commentText}`}
    // Make PUT request to server
    fetch("https://git-clone-blog.herokuapp.com/gitpush/comment", {
        method: 'PUT',
        body: JSON.stringify(addComment),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      // Server returns data for the new comment to let us render it
      .then(resp => resp.json())
      .then(newComment => renderNewComment(newComment))
      .catch(err => console.log(err))
}

function renderNewComment(newComment) {
    // Add comment to the local data
    post.comments.push(newComment);
    sessionStorage.journalPost = JSON.stringify(post);
    // Refresh page so new comment gets loaded by entry.js
    location.reload();
}