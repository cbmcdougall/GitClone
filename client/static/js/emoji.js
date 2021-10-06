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
    let emojiCount = parseInt(thumbsUpEmoji.children[1].textContent) // Stores the current text content as an integer
    emojiCount++ // Increments it by 1
    thumbsUpEmoji.children[1].textContent = emojiCount.toString() // Stores it back in the html
  } else if(emoji === "emoji-thumbs-up" && hasUserClickedTUp) {
    hasUserClickedTUp = false;
    thumbsUpEmoji.children[1].textContent--
  } else if(emoji === "emoji-thumbs-down" && !hasUserClickedTDown) {
    hasUserClickedTDown = true;
    let emojiCount = parseInt(thumbsDownEmoji.children[1].textContent)
    emojiCount++
    thumbsDownEmoji.children[1].textContent = emojiCount.toString()
  } else if(emoji === "emoji-thumbs-down" && hasUserClickedTDown) {
    hasUserClickedTDown = false;
    thumbsDownEmoji.children[1].textContent--
  } else if(emoji === "emoji-laughing" && !hasUserClickedLaughing) {
    hasUserClickedLaughing = true;
    let emojiCount = parseInt(laughEmoji.children[1].textContent)
    emojiCount++ // Increments it by 1
    laughEmoji.children[1].textContent = emojiCount.toString()
  } else if(emoji === "emoji-laughing" && hasUserClickedLaughing) {
    hasUserClickedLaughing = false;
    laughEmoji.children[1].textContent--
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

// async function sendEmojiUpdate(emojis) {
//   let data = {
//     emojis,
//   };
//   const options = {
//     method: "PATCH",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   const response = await fetch(
//     `https://git-clone-blog.herokuapp.com/pushes/${selectedId}`,
//     options
//   );
//   const responseJson = await response.json();
//   console.log(responseJson);
// }














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
