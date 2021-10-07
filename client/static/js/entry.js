// Retrieve the data for the post to be rendered
const post = JSON.parse(sessionStorage.journalPost);
// Define the html elements that will contain the post contents
const journalTitle = document.getElementById("journalTitle");
const journalID = document.getElementById("journalTitleHash");
const journalContent = document.getElementById("journalContentText")
const journalGif = document.getElementById("gif")
const journalDate = document.getElementById("date-posted");
const journalNumComments = document.getElementById("num-of-comments");
const journalThumbsUp = document.getElementById("emoji-thumbs-up");
const journalThumbsDown = document.getElementById("emoji-thumbs-down");
const journalLaughing = document.getElementById("emoji-laughing");
const commentSection = document.getElementById("all-comments");

//----------Render the post----------//
// Post title and id
journalTitle.textContent = post.title;
journalID.textContent = `#${post.id}`;
// Post content and gif
journalContent.innerHTML = post.text;
journalGif.setAttribute("src", post.gifUrl);
// Interaction bar
journalDate.textContent = post.date;
journalNumComments.textContent = post.comments.length;
// Emoji containers defined here have 2 children, children[0] is the icon and children[1] is the count
journalThumbsUp.children[1].textContent = post.thumbsUp;
journalThumbsDown.children[1].textContent = post.thumbsDown;
journalLaughing.children[1].textContent = post.laughing;
// Comments section
if (post.comments.length){
    // Only render if there are comments to render
    post.comments.reverse().forEach(comment => {
        // Define the containers for the comments
        const commentContainer = document.createElement("div")
        const idContainer = document.createElement("div");
        const bodyContainer = document.createElement("P");
        const dateContainer = document.createElement("div");
        // Add the classes for CSS styling
        commentContainer.className = "comment";
        idContainer.className = "comment-id";
        bodyContainer.className = "comment-body";
        dateContainer.className = "comment-date";
        // Add the contents
        idContainer.textContent = `#${comment.id}`;
        bodyContainer.textContent = comment.body;
        dateContainer.textContent = comment.dateAdded;
        // Add to the comment section
        commentContainer.appendChild(idContainer);
        commentContainer.appendChild(bodyContainer);
        commentContainer.appendChild(dateContainer);
        commentSection.appendChild(commentContainer);
    });
}
// Allow scrolling down the page if contents overflow
document.body.style.overflow = 'visible'