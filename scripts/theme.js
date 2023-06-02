const switchTheme = document.getElementById('menu__theme_switch')
const menuTheme = document.getElementById('menu__theme_text')

const setVar = (varName, varValue) => {
    return document.documentElement.style.setProperty(varName, varValue)
}
const blackTheme = () => {
    menuTheme.innerText = 'Enable light theme'
    setVar('--bg-block', '#222222');
    setVar('--bg-border', '#424242');
    setVar('--bg-hover', '#333333');
    setVar('--bg-body', '#141414');
    setVar('--bg-footer', '#333333');
    setVar('--color-text', '#e1e3e6');
}
const lightTheme = () => {
    menuTheme.innerText = 'Enable dark theme'
    setVar('--bg-block', '#fff');
    setVar('--bg-border', '#dce1e6');
    setVar('--bg-hover', '#f5f6f8');
    setVar('--bg-body', '#edeef0');
    setVar('--bg-footer', '#f0f2f5');
    setVar('--color-text', '#333333');
}

if(localStorage.getItem('theme') == 'black'){
    blackTheme()
    switchTheme.checked = true
}

switchTheme.addEventListener('click', function(){
    if(switchTheme.checked) {
        blackTheme()
        localStorage.setItem('theme', 'black')
    } else {
        lightTheme()
        localStorage.setItem('theme', 'light')
    }
})