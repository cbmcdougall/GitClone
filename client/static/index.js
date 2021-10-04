// Here we are conecting the backend to the frontend

// const form = document.getElementById('myForm');
// const resultDiv = document.getElementById('post');

// form.addEventListener('submit', function (event) {
//     event.preventDefault()
//     let post = event.target.post.value
//     //fetch('http://localhost:3000/weather?city='+city)
//     .then(resp => resp.text())
//     .then(post => resultDiv.innerHTML = post)
// })

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