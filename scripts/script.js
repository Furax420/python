document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Charger le mode sombre à partir du localStorage
    const darkModeOn = localStorage.getItem('darkMode') === 'true';
    if (darkModeOn) {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Enregistrer le mode dans le localStorage
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });
});
