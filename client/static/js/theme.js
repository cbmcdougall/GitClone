// //For dark/light theme toggle
const moonIcon = document.querySelector('.sun-moon-theme');
const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

// Load dark theme if it was toggled on
const darkThemeOn = sessionStorage.getItem("darktheme")
if (darkThemeOn==="true"){
    document.body.className = "dark-theme";
    moon.classList.add('hide-icon');
    sun.classList.remove('hide-icon');
}

moonIcon.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    moon.classList.toggle('hide-icon');
    sun.classList.toggle('hide-icon');
    // Store toggle info between pages
    if (document.body.className.includes("dark-theme")){
        // Currently in dark mode
        sessionStorage.setItem("darktheme", "true")
    } else {
        // Currently in light mode
        sessionStorage.setItem("darktheme", "false")
    }
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
                if (path.endsWith("/index.html")){
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

///////////////////////////////////////////////////////////////////
//git add -header eventListener

// const gitAddBtn = document.querySelector("#gitAddHeadBtn");
// const msgBox = document.getElementById('message');

// gitAddBtn.addEventListener('click', transportPost);

// function transportPost() {
    
//     msgBox.style.display = 'block'
//     window.location.href = '/client/index.html'
//     if (msgBox.style.display==='none') {
//         msgBox.style.display = 'block'
//     } else {
//         msgBox.style.display = 'block'
//     }
    
    
// }


module.exports = { fillSuggestions, showSuggestions }











