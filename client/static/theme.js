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

////for RESPONSIVENESS
//menu-list
const menuList = document.querySelector('#menu-list');

menuList.style.maxHeight = "0px";

function toggleMenu() {
    if(menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "100px"
    } else {
        menuList.style.maxHeight = "0px"
    }
}


