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
const searchContainer = document.querySelector(".search-container");
const elementSearchContainer = searchContainer.querySelector(".element-search-container");
const searchBar = searchContainer.querySelector("#searchBar");

searchBar.onkeyup = (e) => {
    console.log(e.target.value)
}





















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

