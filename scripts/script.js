document.addEventListener('DOMContentLoaded', () => {
    const loadingSection = document.getElementById('loadingSection');
    const mainContent = document.getElementById('mainContent');
    const particlesBackground = document.getElementById('particles-background');
    const particlesForeground = document.getElementById('particles-foreground');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    document.getElementById('buttonLink').addEventListener('click', () => {
        // Appliquer l'effet de fondu aux particules et à la section de chargement
        loadingSection.style.opacity = 0;
        particlesBackground.style.opacity = 0;
        particlesForeground.style.opacity = 0;

        setTimeout(() => {
            loadingSection.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.style.opacity = 1;
        }, 500); // Durée de l'animation en ms
    });

    // Gestion du mode sombre
    const darkModeOn = localStorage.getItem('darkMode') === 'true';
    if (darkModeOn) {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });
});