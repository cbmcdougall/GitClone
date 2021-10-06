const post = JSON.parse(sessionStorage.journalPost);
const journalTitle = document.getElementById("journalTitle");
const journalID = document.getElementById("journalTitleHash");
const journalContent = document.getElementById("journalContentText")
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
journalContent.children[0].innerHTML = post.text;
// Interaction bar
journalDate.textContent = post.date;
journalNumComments.textContent = post.comments.length;
journalThumbsUp.children[1].textContent = post.thumbsUp;
journalThumbsDown.children[1].textContent = post.thumbsDown;
journalLaughing.children[1].textContent = post.laughing;
// Comments section
if (post.comments.length){
    post.comments.forEach(comment => {
        const bodyContainer = document.createElement("P");
        const dateContainer = document.createElement("div");
        bodyContainer.className = "comment-body";
        dateContainer.className = "comment-date";
        const commentBody = document.createTextNode(`${comment.body}`);
        const commentDate = document.createTextNode(`${comment.dateAdded}`);
        bodyContainer.appendChild(commentBody);
        dateContainer.appendChild(commentDate);
        commentSection.appendChild(bodyContainer);
        commentSection.appendChild(dateContainer);
    });
}