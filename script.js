// Animation du menu flottant améliorée
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll vers le bas
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll vers le haut
        header.style.transform = 'translateY(0)';
    }
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Animation au défilement
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated');
            entry.target.classList.add(entry.target.dataset.animation);
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, {
    root: null,
    threshold: 0.1
});

document.querySelectorAll('[data-animation]').forEach(element => {
    observer.observe(element);
});

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        sendToFormFree(formData);
    });
});

function sendToFormFree(formData) {
    // Simuler l'envoi à FormFree (à remplacer par l'intégration réelle)
    console.log('Envoi des données à FormFree:', Object.fromEntries(formData));
    alert('Votre message a été envoyé avec succès !');
    document.getElementById('contact-form').reset();
}

// Initialisation de la carte Google Maps
function initMap() {
    const esimLocation = { lat: 5.3484, lng: -4.0668 }; // Coordonnées à ajuster
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: esimLocation
    });
    const marker = new google.maps.Marker({
        position: esimLocation,
        map: map
    });
}

// Animation des icônes de filières
document.querySelectorAll('.filiere-card i').forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.classList.add('animate__animated', 'animate__rubberBand');
    });
    icon.addEventListener('animationend', () => {
        icon.classList.remove('animate__animated', 'animate__rubberBand');
    });
});

// Menu mobile
const mobileMenuButton = document.querySelector('button.md\\:hidden');
const mobileMenu = document.querySelector('div.hidden.md\\:flex');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    mobileMenu.classList.toggle('flex-col');
    mobileMenu.classList.toggle('absolute');
    mobileMenu.classList.toggle('top-16');
    mobileMenu.classList.toggle('left-0');
    mobileMenu.classList.toggle('w-full');
    mobileMenu.classList.toggle('bg-white');
    mobileMenu.classList.toggle('shadow-md');
    mobileMenu.classList.toggle('p-4');
});