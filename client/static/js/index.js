var toolbarOptions = [['bold', 'italic', 'underline','strike'] ,['blockquote','code-block']];

// Initialize Quill editor
var quill = new Quill('#textArea', {
    theme: 'snow',
    placeholder: 'Write here...',
    modules: {
        toolbar:toolbarOptions
           
    }

});

// being able to access the user data 
console.log(document.querySelector('.ql-editor').innerHTML)

// Display git add form for new post
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
fetch("https://git-clone-blog.herokuapp.com/pushes")
  .then(resp => resp.json())
  .then(data => renderPosts(data.slice(-5).reverse()))
  .catch(err => console.log(err));

function renderPosts(data){
    const pushes = document.getElementById("threads");
    
    data.forEach( post=> {
        // Create a container for the post
        const pushContainer = document.createElement("div");
        pushContainer.setAttribute("id", "fiveDivs");

        // Add post title
        const postLink = document.createElement("A");
        const postTitle = document.createElement("h1");
        postTitle.setAttribute("id", "journalTitle");
        postLink.style.textDecoration = "none";

        // Set the post title as link to post
        postLink.setAttribute("href", "./static/entry.html");
        postLink.addEventListener("click", () => {
            // store the post data for entry.html to receive
            sessionStorage.journalPost = JSON.stringify(post);
        })
        
        // Add interaction bar
        const interactionBar = document.createElement("div");
        interactionBar.setAttribute("id", "interaction-bar");
        
        // Date of post
        const pushDate = document.createElement("P");
        pushDate.setAttribute("id", "date-posted");
        
        // Post comments
        const pushComments = document.createElement("P");
        pushComments.setAttribute("id", "num-of-comments");
        
        // Emojis
        const emojiContainer = document.createElement("div");
        emojiContainer.setAttribute("id", "emojis");
        emojiContainer.className = "emojis";

        const emojiThumbsUp = document.createElement("div");
        emojiThumbsUp.setAttribute("id", "emoji-thumbs-up");
        const thumbsUp = document.createElement("I");
        thumbsUp.classList = "fas fa-thumbs-up";
        const thumbsUpNumber = document.createElement("span");
        
        const emojiThumbsDown = document.createElement("div");
        emojiThumbsDown.setAttribute("id", "emoji-thumbs-down");
        const thumbsDown = document.createElement("I");
        thumbsDown.classList = "fas fa-thumbs-down";
        const thumbsDownNumber = document.createElement("span");

        const emojiLaughing = document.createElement("div");
        emojiLaughing.setAttribute("id", "emoji-laughing");
        const laughing = document.createElement("I");
        laughing.classList = "fas fa-grin-squint-tears";
        const laughingNumber = document.createElement("span");
        
        // Insert data into elements
        postTitle.textContent = post.title;
        pushDate.textContent = post.date;
        pushComments.textContent = post.comments.length;
        thumbsUpNumber.textContent = post.thumbsUp;
        thumbsDownNumber.textContent = post.thumbsDown;
        laughingNumber.textContent = post.laughing;
        
        // Insert elements to the DOM
        postLink.appendChild(postTitle);

        emojiThumbsUp.appendChild(thumbsUp);
        emojiThumbsUp.appendChild(thumbsUpNumber);
        emojiThumbsDown.appendChild(thumbsDown);
        emojiThumbsDown.appendChild(thumbsDownNumber);
        emojiLaughing.appendChild(laughing);
        emojiLaughing.appendChild(laughingNumber);
        emojiContainer.appendChild(emojiThumbsUp);
        emojiContainer.appendChild(emojiThumbsDown);
        emojiContainer.appendChild(emojiLaughing);
        
        interactionBar.appendChild(pushDate);
        interactionBar.appendChild(pushComments);
        interactionBar.appendChild(emojiContainer);
        
        pushContainer.appendChild(postLink);
        pushContainer.appendChild(interactionBar);

        pushes.appendChild(pushContainer);
    })
}
