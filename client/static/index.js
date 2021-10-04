// Here we are conecting the backend to the frontend

// const { response } = require("express");

const addPost = document.getElementById('gitAdd');
const msgBox = document.getElementById('message');

msgBox.style.display='none';

addPost.addEventListener('click', showMessageBox);

function showMessageBox() {
    if (msgBox.style.display==='block') {
        msgBox.style.display = 'none'
    } else {
        msgBox.style.display = 'block'
    }
}




// Display recent posts, redirect to entry.html for the post clicked
fetch("../../backend/data.json")
  .then(resp => resp.json())
  .then(data => renderPosts(data))
  .catch(err => console.log(err));

function renderPosts(data){
    data.forEach( post=> {
        const postSection = document.createElement("section");
        const postLink = document.createElement("A");
        const postTitle = document.createTextNode(`${post.title}`);
        postLink.setAttribute("href", "./static/entry.html");
        postLink.addEventListener("click", () => {
            // store the post data for entry.html to receive
            sessionStorage.journalPost = JSON.stringify(post);
        })
        postLink.appendChild(postTitle);
        postSection.appendChild(postLink);
        document.body.appendChild(postSection);
    })
}
