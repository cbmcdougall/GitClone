// On form submission, adds new blog post
const postForm = document.getElementById("message");
postForm.addEventListener("submit", addNewPost);

function addNewPost(e) {
    e.preventDefault();
    // Get the form data
    const postTitle = e.target.titlePost.value;
    const postText = document.querySelector('.ql-editor').innerHTML;
    const postGifLink = e.target.gifLink.value;

    // Define the required body for the PUT request to server
    const post = {title: `${postTitle}`, text: `${postText}`, gifUrl: `${postGifLink}`};
   
    // Make PUT request to server
    fetch("https://git-clone-blog.herokuapp.com/gitpush", {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      // Server returns data of new post so we can immediately redirect to it
      .then(resp => resp.json())
      .then(newPost => redirectToPost(newPost))
      .catch(err => console.log(err))
}

function redirectToPost(targetPost){
    // Store the post data for entry.js to render
    sessionStorage.journalPost = JSON.stringify(targetPost);
    // Send user to entry page of their new post
    window.location.href = './static/entry.html';
}