// //Emoji reaction on entry.html
// const post = JSON.parse(sessionStorage.journalPost);

// const tUpEmo = document.querySelector("#emoji-thumbs-up");
// const tDownEmo = document.querySelector("#emoji-thumbs-down");
// const laughingEmo = document.querySelector("#emoji-laughing");

// //When emoji is clicked then add number:
// tUpEmo.addEventListener('click', () => {
    
// })



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

getPost(postId);

let reactions = [
    {
        emoji: "thumbs-up",
        apiCall: "thumbsUp"
    },
    {
        emoji: "thumbs-down",
        apiCall: "heart"
    },
    {
        emoji: "grin-squint-tears",
        apiCall: "angryFace"
    }
]

reactions.forEach(reaction => {
    let button = document.querySelector(`.emojis i.fa-${reaction.emoji}`);
    button.addEventListener('click', (event) => {
        updateReaction(reaction.apiCall,postId);
    })
})


function getPost(id) {
  fetch(`https://git-clone-blog.herokuapp.com/pushes/${id}`)
    .then(function(res){
      if(!res.ok) {
        throw new Error("HTTP error " + res.status)
      }
      return res.json()
    })
    .then(function(data) {
        updateUI(data);
    })
    .catch(err => console.log(err))
}

function updateReaction(reaction, id) {

    fetch(`https://git-clone-blog.herokuapp.com/pushes/${id}/${reaction}`, {
        method: "PUT"
    }).then(res => {
        if(!res.ok) {
            throw new Error("HTTP error " + res.status)
        }
        location.reload();
    }).catch(err => console.log(err));
}
