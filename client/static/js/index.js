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

function characterLimit() {
    const currentInput = quill.getText();
    const remainingChars = 400-currentInput.length;
    
    const charLimitText = document.getElementById("character-limit")
    //const colour = remainingChars >= 0 ? 'green': 'red'
    charLimitText.textContent = `Remaining characters: ${remainingChars}`;
    // charLimitText.style.color = colour
}


quill.on('text-change', function(delta, oldDelta, source) {
    if (source == 'user') {
    if (quill.getLength() > 399) {
        quill.deleteText(399, quill.getLength());
      }
    characterLimit();
    }
  });


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

//Gif searcher code
function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }
  

const gifSearch = document.getElementById('gifQuery')
const gifLink = document.getElementById('gifLink')
const gifImg = document.getElementById('gif')

gifSearch.addEventListener('keyup', delay(function (e) {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=acjbCkgI3OtN7HNIvA9Pgcfl1I87HOdH&q=${this.value}&limit=1&offset=0&rating=g&lang=en`)
    .then(data => data.json())
    .then(data => {
        console.log(data)     
        let link = data.data[0].images.fixed_height_small.url;
        console.log(link);
        gifImg.src=link;
        gifLink.value=link;
    })

}, 1000))



// Display 5 most recent posts, redirect to entry.html for the post clicked
fetch("https://git-clone-blog.herokuapp.com/pushes")
  .then(resp => resp.json())
  .then(posts => renderPosts(posts.slice(-5).reverse()))
  .catch(err => console.log(err));

function renderPosts(posts){
    const pushes = document.getElementById("threads");
    
    posts.forEach(post => {
        // Create a container for the post
        const pushContainer = document.createElement("div");
        pushContainer.setAttribute("id", "fiveDivs");

        // Add post title
        const postTitle = document.createElement("h1");
        postTitle.setAttribute("id", "journalTitle");
        
        // Set the post title as link to post entry
        const postLink = document.createElement("A");
        postLink.style.textDecoration = "none";
        postLink.setAttribute("href", "./static/entry.html");
        postLink.addEventListener("click", () => {
            // Store the post data for entry.js to render
            sessionStorage.journalPost = JSON.stringify(post);
        })
        
        // Add interaction bar
        const interactionBar = document.createElement("div");
        interactionBar.setAttribute("id", "interaction-bar");
        
        // Date of post
        const pushDate = document.createElement("P");
        pushDate.setAttribute("id", "date-posted");
        
        // Number of comments
        const pushComments = document.createElement("P");
        pushComments.setAttribute("id", "num-of-comments");
        
        // Emojis
        const emojiContainer = document.createElement("div");
        emojiContainer.setAttribute("id", "emojis");
        emojiContainer.className = "emojis";
        // Thumbs Up
        const emojiThumbsUp = document.createElement("div");
        emojiThumbsUp.setAttribute("id", "emoji-thumbs-up");
        const thumbsUp = document.createElement("I");
        thumbsUp.classList = "fas fa-thumbs-up";
        const thumbsUpNumber = document.createElement("span");
        // Thumbs Down
        const emojiThumbsDown = document.createElement("div");
        emojiThumbsDown.setAttribute("id", "emoji-thumbs-down");
        const thumbsDown = document.createElement("I");
        thumbsDown.classList = "fas fa-thumbs-down";
        const thumbsDownNumber = document.createElement("span");
        // Laughing
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
