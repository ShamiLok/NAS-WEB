const burgerMenu = document.getElementById('burger__menu')
const menu = document.getElementById('menu__nav')
burgerMenu.addEventListener('click', openMenu)
function openMenu(){
    if(menu.classList.contains('open')){
        menu.classList.remove('open')
        burgerMenu.classList.remove('open')
    } else {
        menu.classList.add('open')
        burgerMenu.classList.add('open')
    }
}