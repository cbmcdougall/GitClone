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

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

fetch("https://git-clone-blog.herokuapp.com/pushes")
    .then(resp => resp.json())
    .then(data => fillSuggestions(data))
    .catch(err => console.log(err));



function fillSuggestions(data){
    const suggestions = data.map(post => {return post.title})
        


    
    // if user press any key and release
    inputBox.onkeyup = (e)=>{
        let userData = e.target.value; //user enetered data
        let emptyArray = [];
        if(userData){
            emptyArray = suggestions.filter((data)=>{
                //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                return data.toLowerCase().startsWith(userData.toLowerCase());
            });
            emptyArray = emptyArray.map((data)=>{
                // passing return data inside li tag
                return data = `<li>${data}</li>`;
            });
            // for (let i = 0; i < emptyArray.length; i++) {
            //     emptyArray[i].onclick = () => {
            //         let selectData = this.textContent
            //         const result = data.filter(post => {
            //             return selectData.toLowerCase() === post.title.toLowerCase()
            //             })
            //             sessionStorage.journalPost = JSON.stringify(result[0]);
            //             window.location.href = "entry.html"
            //     }
            // }
            searchWrapper.classList.add("active"); //show autocomplete box
            showSuggestions(emptyArray);
            let allList = suggBox.querySelectorAll("li");
            for (let i = 0; i < allList.length; i++) {
                //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
            //     allList[i].onclick = () => {
            //         let selectData = this.textContent
            //         const result = data.filter(post => {
            //             return selectData.toLowerCase() === post.title.toLowerCase()
            //             })
            //             sessionStorage.journalPost = JSON.stringify(result[0]);
            //             window.location.href = "entry.html"
            //     }
            }
            icon.onclick = ()=>{
                const result = data.filter(post => {
                return inputBox.value.toLowerCase() === post.title.toLowerCase()
                })
                sessionStorage.journalPost = JSON.stringify(result[0]);
                const path = window.location.pathname;
                if (path==="/client/index.html"){
                    // We're currently on homepage
                    window.location.href = "./static/entry.html"
                } else {
                    // We're currently on entry.html
                    location.reload()
                }
            }
        }else{
            searchWrapper.classList.remove("active"); //hide autocomplete box
        }
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    userData = selectData;
    // icon.onclick = ()=>{
    //     const result = data.filter(post => {
    //     return userData.toLowerCase() === post.title.toLowerCase()
    //     })
    //     sessionStorage.journalPost = JSON.stringify(result[0]);
    //     window.location.href = "entry.html"
        
    
    //}
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

//////////////////////////////////////////




















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

