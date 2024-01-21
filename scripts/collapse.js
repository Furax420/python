document.querySelectorAll('.collapse-button').forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const arrow = this.querySelector('.collapse-arrow');

        // Basculer la visibilité du contenu
        content.style.display = content.style.display === 'block' ? 'none' : 'block';

        // Changer l'image de la flèche
        arrow.src = content.style.display === 'block' ? '/sources/angle-de-la-fleche-vers-le-haut.png' : '/sources/fleche-vers-le-bas.png';
    });
});