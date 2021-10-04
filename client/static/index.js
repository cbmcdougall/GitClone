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
examplePost = [{
    "id": "2",
    "title": "Hello world!",
    "text": "This is an example post",
    "date": "04/10/2021",
    "thumbsUp": "2",
    "thumbsDown": "0",
    "comments": [{
        body: "hello there!",
        dateAdded: "04/10/2021"
    }],
},{
    "id": "3",
    "title": "Hello again!",
    "text": "This is another example post",
    "date": "04/10/2021",
    "thumbsUp": "0",
    "thumbsDown": "3",
    "comments": []
}];

examplePost.forEach( post=> {
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