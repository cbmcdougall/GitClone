const post = JSON.parse(sessionStorage.journalPost);
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


// Post title and id
journalTitle.textContent = post.title;
journalID.textContent = `#${post.id}`;
// Post content
journalContent.innerHTML = post.text;
journalGif.setAttribute("src", post.gifUrl);
// Interaction bar
journalDate.textContent = post.date;
journalNumComments.textContent = post.comments.length;
journalThumbsUp.children[1].textContent = post.thumbsUp;
journalThumbsDown.children[1].textContent = post.thumbsDown;
journalLaughing.children[1].textContent = post.laughing;
// Comments section
if (post.comments.length){
    post.comments.reverse().forEach(comment => {
        const bodyContainer = document.createElement("P");
        const idContainer = document.createElement("div");
        const dateContainer = document.createElement("div");
        bodyContainer.className = "comment-body";
        idContainer.className = "comment-id";
        dateContainer.className = "comment-date";
        const commentBody = document.createTextNode(`${comment.body}`);
        const commentId = document.createTextNode(`#${comment.id}`);
        const commentDate = document.createTextNode(`${comment.dateAdded}`);
        bodyContainer.appendChild(commentBody);
        idContainer.appendChild(commentId);
        dateContainer.appendChild(commentDate);
        commentSection.appendChild(bodyContainer);
        commentSection.appendChild(idContainer);
        commentSection.appendChild(dateContainer);
    });
}