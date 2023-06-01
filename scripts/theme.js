const switchTheme = document.getElementById('menu__theme_switch')
const menuTheme = document.getElementById('menu__theme_text')
switchTheme.addEventListener('click', function(){
    if(switchTheme.checked) {
        menuTheme.innerText = 'Enable white theme'
        document.documentElement.style.setProperty('--bg-block', '#222222');
        document.documentElement.style.setProperty('--bg-border', '#424242');
        document.documentElement.style.setProperty('--bg-hover', '#333333');
        document.documentElement.style.setProperty('--bg-body', '#141414');
        document.documentElement.style.setProperty('--bg-footer', '#333333');
        document.documentElement.style.setProperty('--color-text', '#e1e3e6');
    } else {
        menuTheme.innerText = 'Enable dark theme'
        document.documentElement.style.setProperty('--bg-block', '#fff');
        document.documentElement.style.setProperty('--bg-border', '#dce1e6');
        document.documentElement.style.setProperty('--bg-hover', '#f5f6f8');
        document.documentElement.style.setProperty('--bg-body', '#edeef0');
        document.documentElement.style.setProperty('--bg-footer', '#f0f2f5');
        document.documentElement.style.setProperty('--color-text', '#333333');
    }
})