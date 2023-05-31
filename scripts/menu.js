const burgerMenu = document.getElementById('burger__menu')
const menu = document.getElementById('menu__nav')
const dark = document.getElementById('dark')
burgerMenu.addEventListener('click', openMenu)
function openMenu(){
    if(menu.classList.contains('open')){
        menu.classList.remove('open')
        burgerMenu.classList.remove('open')
        dark.classList.remove('active')
    } else {
        menu.classList.add('open')
        burgerMenu.classList.add('open')
        dark.classList.add('active')
    }
}