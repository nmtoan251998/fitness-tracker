const slideUp = {
    distance: '110%',
    origin: 'bottom',
    opacity: null
};

const slideDown = {
    distance: '130%',
    origin: 'top',
    opacity: 0
};

const slideRight = {
    distance: '130%',
    origin: 'left',
    opacity: null
};

const slideLeft = {
    distance: '130%',
    origin: 'right',
    opacity: null
};

ScrollReveal().reveal('.introduction-miband2', slideRight);
ScrollReveal().reveal('.heartrate-feature-miband2', slideUp);
ScrollReveal().reveal('.app-feature-miband2-bg', slideUp);
ScrollReveal().reveal('.step-feature-miband2', slideLeft);

ScrollReveal().reveal('.app-feature-miband2-btn', {        
    distance: '150%',
    origin: 'bottom',
    opacity: null,
    rotate: {
        x: 20,
        z: 20
    }
});

ScrollReveal().reveal('#myChart', slideUp);

ScrollReveal().reveal('.card', slideDown);

