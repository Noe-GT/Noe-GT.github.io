function toggleMenu() {
    var container = document.getElementById('navbar-container');
    var menu = document.getElementById('ham-nav-menu');
    var main_container = document.getElementById('main-container')

    if (container.classList.contains('elongate')) {
        menu.classList.remove('open');
        container.classList.remove('elongate');
        main_container.classList.remove('blur');
    } else {
        menu.classList.add('open');
        container.classList.add('elongate');
        main_container.classList.add('blur');
    }
}
