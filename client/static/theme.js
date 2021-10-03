//For dark/light theme toggle
const moonIcon = document.querySelector('.sun-moon-theme');

moonIcon.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme')
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


