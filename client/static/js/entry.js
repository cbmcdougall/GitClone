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
        const bodyContainer = document.createElement("P");
        const idContainer = document.createElement("div");
        const dateContainer = document.createElement("div");
        // Add the classes for CSS styling
        bodyContainer.className = "comment-body";
        idContainer.className = "comment-id";
        dateContainer.className = "comment-date";
        // Add the contents
        bodyContainer.textContent = comment.body;
        idContainer.textContent = `#${comment.id}`;
        dateContainer.textContent = comment.dateAdded;
        // Add to the comment section
        commentSection.appendChild(bodyContainer);
        commentSection.appendChild(idContainer);
        commentSection.appendChild(dateContainer);
    });
}