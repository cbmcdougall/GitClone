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

let suggestions = [
    "ant", "bird", "cat", "dog", "elephant", "fish", "goat", "horse", "igloo", "jackal", "kangeroo", "lizard", "monkey", "nobody", "octopus",
    "pig", "queen", "rat", "snake", "umbrella", "venom", "whale", "xylophone", "yacht", "zebra", "animal", "bat", "banana", "blood", "beautiful"
]
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

// searchBar.onkeyup = (e) => {
//     let userData = e.target.value; //user enters data
//     let emptyArray = [];
//     if(userData){
//         emptyArray = testArray.filter((data)=> {
//             return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
//         });
//         emptyArray = emptyArray.map((data)=> {
//             return data = '<a href="#">' + data + '</a>';
//         });
//         console.log(emptyArray);
//         resultsBox.classList.add("active");
//     } else {

//     }
//     showSuggestions(emptyArray);
// }

// function showSuggestions(list){
//     let listData;
//     if(!list.length) {

//     } else {
//         listData = list.join()
//     }
//     resultsBox.innerHTML = listData;

// }
















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

