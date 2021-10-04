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



// form.addEventListener('submit', function (event) {
//     event.preventDefault()
//     let post = event.target.post.value
//     //fetch('http://localhost:3000/weather?city='+city)
//     .then(resp => resp.text())
//     .then(post => resultDiv.innerHTML = post)
// })