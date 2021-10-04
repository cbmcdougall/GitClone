// Here we are conecting the backend to the frontend

const form = document.getElementById('myForm');
const resultDiv = document.getElementById('post');

form.addEventListener('submit', function (event) {
    event.preventDefault()
    let post = event.target.post.value
    //fetch('http://localhost:3000/weather?city='+city)
    .then(resp => resp.text())
    .then(post => resultDiv.innerHTML = post)
})