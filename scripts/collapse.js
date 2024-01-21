document.querySelectorAll('.collapse-button').forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const arrow = this.querySelector('.collapse-arrow');
  
      // Basculer la visibilité du contenu
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
  
      // Animation de la flèche
      arrow.innerHTML = content.style.display === 'block' ? '&#9650;' : '&#9660;';
    });
  });
  