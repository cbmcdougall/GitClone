let thumbsUpEmoji, laughEmoji, thumbsDownEmoji;
const emojis = document.querySelector('#emojis');


thumbsUpEmoji = document.getElementById("emoji-thumbs-up");
thumbsUpEmoji.children[0].addEventListener("click", () => incrementCount("emoji-thumbs-up"));
thumbsDownEmoji = document.getElementById("emoji-thumbs-down");
thumbsDownEmoji.addEventListener("click", () => incrementCount("emoji-thumbs-down"));
laughEmoji = document.getElementById("emoji-laughing");
laughEmoji.addEventListener("click", () => incrementCount("emoji-laughing"));

let hasUserClickedTUp = false;
let hasUserClickedTDown = false;
let hasUserClickedLaughing = false;

function incrementCount(emoji) {
  if (emoji === "emoji-thumbs-up" && !hasUserClickedTUp) {
    hasUserClickedTUp = true;
    thumbsUpEmoji.children[1].textContent++
    sendEmojiUpdate('thumbsUp','add')
  } else if(emoji === "emoji-thumbs-up" && hasUserClickedTUp) {
    hasUserClickedTUp = false;
    thumbsUpEmoji.children[1].textContent--
    sendEmojiUpdate('thumbsUp','remove')
  } else if(emoji === "emoji-thumbs-down" && !hasUserClickedTDown) {
    hasUserClickedTDown = true;
    thumbsDownEmoji.children[1].textContent++
    sendEmojiUpdate('thumbsDown','add')
  } else if(emoji === "emoji-thumbs-down" && hasUserClickedTDown) {
    hasUserClickedTDown = false;
    thumbsDownEmoji.children[1].textContent--
    sendEmojiUpdate('thumbsDown','remove')
  } else if(emoji === "emoji-laughing" && !hasUserClickedLaughing) {
    hasUserClickedLaughing = true;
    laughEmoji.children[1].textContent++
    sendEmojiUpdate('laughing','add')
  } else if(emoji === "emoji-laughing" && hasUserClickedLaughing) {
    hasUserClickedLaughing = false;
    laughEmoji.children[1].textContent--
    sendEmojiUpdate('laughing','remove')
    
  }; 
};

//emoji is thumbsUp, thumbsDown, or laughing (case sensitive)
  
function sendEmojiUpdate(emoji, adjust){
  const post = JSON.parse(sessionStorage.journalPost);
  const postId = post.id;
  let data = {
    id: Number(postId),
    adjust: adjust
  };
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
  },
    body: JSON.stringify(data)
  };
  fetch(`https://git-clone-blog.herokuapp.com/gitpush/${emoji}`, options)
      // Server returns data of new post so we can immediately redirect to it
      .then(response => response.json())
      .then(newData => updateData(emoji, newData))
      .catch(err => console.log(err))
}

function updateData(emoji, newData){
  post[emoji] = newData.emojiCount;
  sessionStorage.journalPost = JSON.stringify(post);
}

module.exports = {incrementCount, sendEmojiUpdate, updateData}