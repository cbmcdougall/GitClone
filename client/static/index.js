// Here we are conecting the backend to the frontend

const addPost = document.getElementById('gitAdd');
const msgBox = document.getElementById('message');

msgBox.style.display='none';

addPost.addEventListener('click', showMessageBox);

function showMessageBox() {
    if (msgBox.style.display==='block') {
        msgBox.style.display = 'none'
    } else {
        msgBox.style.display = 'block'
    }
}




// Display 5 most recent posts, redirect to entry.html for the post clicked
fetch("http://localhost:3000/pushes")
  .then(resp => resp.json())
  .then(data => renderPosts(data.slice(-5)))
  .catch(err => console.log(err));

// <--OLD--> keeping for reference if needed
// function renderPosts(data){
//     data.forEach( post=> {
//         const postSection = document.createElement("section");
//         const postLink = document.createElement("A");
//         const postTitle = document.createTextNode(`${post.title}`);
//         postLink.setAttribute("href", "./static/entry.html");
//         postLink.addEventListener("click", () => {
//             // store the post data for entry.html to receive
//             sessionStorage.journalPost = JSON.stringify(post);
//         })
//         postLink.appendChild(postTitle);
//         postSection.appendChild(postLink);
//         document.body.appendChild(postSection);
//     })
// }

function renderPosts(data){
    const pushes = document.getElementById("threads");
    
    data.forEach( post=> {
        // Create a container for the post
        const pushContainer = document.createElement("div");
        pushContainer.setAttribute("id", "fiveDivs");

        // Add post title
        const postLink = document.createElement("A");
        postLink.setAttribute("id", "postTitle");

        // Set the post title as link to post
        postLink.setAttribute("href", "./static/entry.html");
        postLink.addEventListener("click", () => {
            // store the post data for entry.html to receive
            sessionStorage.journalPost = JSON.stringify(post);
        })
        
        // Add interaction bar
        const interactionBar = document.createElement("div");
        interactionBar.setAttribute("id", "pushInteractionBar");
        const pushDate = document.createElement("P");
        pushDate.setAttribute("id", "date");
        const pushComments = document.createElement("P");
        pushComments.setAttribute("id", "commentNo");
        const emojiContainer = document.createElement("div");
        emojiContainer.setAttribute("id", "emojis");
        emojiContainer.className = "emojis";
        const emojiThumbsUp = document.createElement("div");
        emojiThumbsUp.setAttribute("id", "emoji-thumbs-up");
        const thumbsUp = document.createElement("I");
        thumbsUp.classList = "fas fa-thumbs-up";
        const thumbsUpNumber = document.createElement("div");
        const emojiThumbsDown = document.createElement("div");
        emojiThumbsDown.setAttribute("id", "emoji-thumbs-down");
        const thumbsDown = document.createElement("I");
        thumbsDown.classList = "fas fa-thumbs-down";
        const thumbsDownNumber = document.createElement("div");
        
        // Insert data into elements
        postLink.textContent = post.title;
        pushDate.textContent = post.date;
        pushComments.textContent = post.comments.length;
        thumbsUpNumber.textContent = post.thumbsUp;
        thumbsDownNumber.textContent = post.thumbsDown;
        
        // Insert elements to the DOM
        emojiThumbsUp.appendChild(thumbsUp);
        emojiThumbsUp.appendChild(thumbsUpNumber);
        emojiThumbsDown.appendChild(thumbsDown);
        emojiThumbsDown.appendChild(thumbsDownNumber);
        emojiContainer.appendChild(emojiThumbsUp);
        emojiContainer.appendChild(emojiThumbsDown);
        
        interactionBar.appendChild(pushDate);
        interactionBar.appendChild(pushComments);
        interactionBar.appendChild(emojiContainer);
        
        pushContainer.appendChild(postLink);
        pushContainer.appendChild(interactionBar);

        pushes.appendChild(pushContainer);
    })
}
