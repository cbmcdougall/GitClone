let thumbsUpEmoji, laughEmoji, thumbsDownEmoji;
const emojis = document.querySelector('#emojis');


thumbsUpEmoji = document.getElementById("emoji-thumbs-up");
thumbsUpEmoji.children[0].addEventListener("click", () => incrementCount("emoji-thumbs-up"));
thumbsDownEmoji = document.getElementById("emoji-thumbs-down");
thumbsDownEmoji.addEventListener("click", () => incrementCount("emoji-thumbs-down"));
laughEmoji = document.getElementById("emoji-laughing");
laughEmoji.addEventListener("click", () => incrementCount("emoji-laughing"));
const postId = document.getElementById("journalTitleHash").textContent.substring(1);


let hasUserClickedTUp = false;
let hasUserClickedTDown = false;
let hasUserClickedLaughing = false;

function incrementCount(emoji) {
    
  if (emoji === "emoji-thumbs-up" && !hasUserClickedTUp) {
    hasUserClickedTUp = true;
    let emojiCount = parseInt(thumbsUpEmoji.children[1].textContent) // Stores the current text content as an integer
    emojiCount++ // Increments it by 1
    thumbsUpEmoji.children[1].textContent = emojiCount.toString() // Stores it back in the html
    sendEmojiUpdate('thumbsUp','add')
    .then(data => console.log(data))

  } else if(emoji === "emoji-thumbs-up" && hasUserClickedTUp) {
    hasUserClickedTUp = false;
    thumbsUpEmoji.children[1].textContent--
    sendEmojiUpdate('thumbsUp','remove')
  } else if(emoji === "emoji-thumbs-down" && !hasUserClickedTDown) {
    hasUserClickedTDown = true;
    let emojiCount = parseInt(thumbsDownEmoji.children[1].textContent)
    emojiCount++
    thumbsDownEmoji.children[1].textContent = emojiCount.toString()
    sendEmojiUpdate('thumbsDown','add')
  } else if(emoji === "emoji-thumbs-down" && hasUserClickedTDown) {
    hasUserClickedTDown = false;
    thumbsDownEmoji.children[1].textContent--
    sendEmojiUpdate('thumbsDown','remove')
  } else if(emoji === "emoji-laughing" && !hasUserClickedLaughing) {
    hasUserClickedLaughing = true;
    let emojiCount = parseInt(laughEmoji.children[1].textContent)
    emojiCount++ // Increments it by 1
    laughEmoji.children[1].textContent = emojiCount.toString()
    sendEmojiUpdate('laughing','add')
  } else if(emoji === "emoji-laughing" && hasUserClickedLaughing) {
    hasUserClickedLaughing = false;
    laughEmoji.children[1].textContent--
    sendEmojiUpdate('laughing','remove')

  }; 
};


function changeInnerHTML(emojiElement) {
  let regex = /\d+/;
  let numStr = emojiElement.innerHTML.match(regex)[0];
  let digits = numStr.length;
  let num = parseInt(numStr);
  emojiElement.innerHTML = emojiElement.innerHTML.slice(
    0,
    emojiElement.innerHTML.length - digits - 1
  );
  emojiElement.innerHTML += String(num + 1);
}

//emoji is thumbsUp, thumbsDown, or laughing (case sensitive)



async function sendEmojiUpdate(emoji, adjust){
  let data = {
    id: Number(postId),
    adjust: adjust,
  };

  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `https://git-clone-blog.herokuapp.com/gitpush/${emoji}`,
    options
  );
  // const responseJson = await response.json();
  console.log(response);
  return response
}
















// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const postId = urlParams.get('id');

// getPost(postId);

// let reactions = [
//     {
//         emoji: "thumbs-up",
//         apiCall: "thumbsUp"
//     },
//     {
//         emoji: "thumbs-down",
//         apiCall: "heart"
//     },
//     {
//         emoji: "grin-squint-tears",
//         apiCall: "angryFace"
//     }
// ]

// reactions.forEach(reaction => {
//     let button = document.querySelector(`.emojis i.fa-${reaction.emoji}`);
//     button.addEventListener('click', (event) => {
//         updateReaction(reaction.apiCall,postId);
//     })
// })


// function getPost(id) {
//   fetch(`https://git-clone-blog.herokuapp.com/pushes/${id}`)
//     .then(function(res){
//       if(!res.ok) {
//         throw new Error("HTTP error " + res.status)
//       }
//       return res.json()
//     })
//     .then(function(data) {
//         updateUI(data);
//     })
//     .catch(err => console.log(err))
// }

// function updateReaction(reaction, id) {

//     fetch(`https://git-clone-blog.herokuapp.com/pushes/${id}/${reaction}`, {
//         method: "PUT"
//     }).then(res => {
//         if(!res.ok) {
//             throw new Error("HTTP error " + res.status)
//         }
//         location.reload();
//     }).catch(err => console.log(err));
// }
