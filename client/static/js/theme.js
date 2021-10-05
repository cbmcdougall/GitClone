//For dark/light theme toggle
const moonIcon = document.querySelector('.sun-moon-theme');
const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

moonIcon.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    moon.classList.toggle('hide-icon');
    sun.classList.toggle('hide-icon');

})
////////////////////////////////////////////////
///Search bar
const searchBar = document.getElementById('searchBar');
let postTitle = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    const filteredPushes = postTitle.filter(archivePush => {
        return archivePush.title.includes(searchString) || archivePush.text.includes(searchString);
    })

})





















////for RESPONSIVENESS
//menu-list
// const menuList = document.querySelector('#menu-list');

// menuList.style.maxHeight = "0px";

// function toggleMenu() {
//     if(menuList.style.maxHeight == "0px") {
//         menuList.style.maxHeight = "100px"
//     } else {
//         menuList.style.maxHeight = "0px"
//     }
// }



//////////////////////////////////////////////////
//Emoji reactions//
// const thumbsUp = document.querySelector(".fa-thumbs-up");
// const thumbsDown = document.querySelector(".fa-thumbs-down");
// const laughEmoji = document.querySelector(".fa-grin-squint-tears");

// const tUpNum = document.getElementsByClassName('tUpNum');
// const tDownNum = document.getElementsByClassName('tDownNum');
// const laughNum = document.getElementsByClassName('laughNum');

// thumbsUp.addEventListener('click', () => {
//     tUpNum.value = parseInt(tUpNum.value) + 1;
// });


// thumbsDown.addEventListener('click', () => incrementCount("dislikeBtn"));
// laughEmoji.addEventListener('click', () => incrementCount("laughing"));

// const hasUserClickedLikeBtn = false;
// const hasUserClickedDislikeBtn = false;
// const hasUserClickedLaughing = false;

