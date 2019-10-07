const navLink = Array.from($('.navbar-nav .nav-item .nav-link'));
navLink.forEach(nav => {
    const currentPath = window.location.pathname;

    if (nav.getAttribute('href') === currentPath) {
        nav.classList.add('active');
    }    
})