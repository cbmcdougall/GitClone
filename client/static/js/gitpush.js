// On form submission, adds new blog post
const inputForm = document.getElementById("message");
inputForm.addEventListener("submit", addNewPost);

function addNewPost(e) {
    e.preventDefault();
    // Get the form data
    const postTitle = e.target.titlePost.value;
    const postText = e.target.textArea.value;
    const post = {title: `${postTitle}`, text: `${postText}`, gifUrl: ""};
    // Make PUT request to server
    fetch("https://git-clone-blog.herokuapp.com/gitpush", {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      // Server returns JSON of new post
      .then(resp => resp.json())
      .then(newPost => redirectToPost(newPost))
      .catch(err => console.log(err))
}

function redirectToPost(targetPost){
    // Store the post data for entry.html to receive
    sessionStorage.journalPost = JSON.stringify(targetPost);
    // Send user to entry page of their new post
    window.location.href = './static/entry.html';
}