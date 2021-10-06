// On comment form submission, adds new comment to blog post
const commentForm = document.getElementById("comment-form")
commentForm.addEventListener("submit", addNewComment);

function addNewComment(e) {
    e.preventDefault();
    // Get the form data
    const commentText = e.target["comment-here"].value;
    // Get the post id
    const post = JSON.parse(sessionStorage.journalPost);
    const postId = post.id;
    const addComment = {id: `${postId}`, body: `${commentText}`}
    // Make PUT request to server
    fetch("https://git-clone-blog.herokuapp.com/gitpush/comment", {
        method: 'PUT',
        body: JSON.stringify(addComment),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(resp => resp.json())
      .then(newComment => renderNewComment(newComment))
      .catch(err => console.log(err))
}

function renderNewComment(newComment) {
    post.comments.push(newComment);
    sessionStorage.journalPost = JSON.stringify(post);
    location.reload();
}