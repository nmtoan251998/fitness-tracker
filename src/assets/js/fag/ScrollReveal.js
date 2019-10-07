const slideUp = {
    distance: '110%',
    origin: 'bottom',
    opacity: 0
};

const slideDown = {
    distance: '130%',
    origin: 'top',
    opacity: 0
};

const slideRight = {
    distance: '130%',
    origin: 'left',
    opacity: 0
};

const slideLeft = {
    distance: '130%',
    origin: 'right',
    opacity: 0
};

ScrollReveal().reveal('.step-1', slideDown);
ScrollReveal().reveal('.step-2', slideLeft);
ScrollReveal().reveal('.step-3', slideRight);
ScrollReveal().reveal('.step-4', slideLeft);
ScrollReveal().reveal('.step-5', slideRight);
ScrollReveal().reveal('.step-6', slideLeft);
ScrollReveal().reveal('.step-7', slideRight);
ScrollReveal().reveal('.step-8', slideDown);