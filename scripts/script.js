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


// Ajout de carte et modale

async function loadCardData() {
    try {
      const response = await fetch('../sources/data_card.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Could not load card data:', error);
    }
  }
// Charger les données et créer les cartes dans le conteneur spécifié
loadCardData().then(dataCards => {
    if (dataCards) {
      const cardsContainer = document.getElementById('card-container');
      dataCards.forEach(cardData => {
        const cardElement = createCard(cardData);
        cardsContainer.appendChild(cardElement);
      });
    }
  });
  
let dataCards = []; // Remplir cette variable avec les données JSON

function createCard(cardData) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${cardData.image}" alt="${cardData.title}" class="card__image">
    <div class="card__content">
      <p class="card__title">${cardData.title}</p>
      <p class="card__description">${cardData.description}</p>
    </div>
  `;
  card.onclick = () => openModal(cardData);
  return card;
}

function openModal(cardData) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__content">
      <img src="${cardData.imageModal}" alt="${cardData.title}" class="modal__image">
      <div class="modal__text">${cardData.fullText}</div>
      <button type="button" class="btn cube cube-hover modal__close">
      <div class="bg-top">
      <div class="bg-inner"></div>
      </div>
      <div class="bg-right">
      <div class="bg-inner"></div>
      </div>
      <div class="bg">
      <div class="bg-inner"></div>
      </div>
      <div class="text">Fermer</div>
    </button>    </div>
  `;

  const closeButton = modal.querySelector('.modal__close');
  closeButton.onclick = () => modal.remove();
// Fermer la modale lorsque l'overlay est cliqué
modal.onclick = (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  };
  document.body.appendChild(modal);
}

// Création et ajout des cartes au DOM
dataCards.forEach(cardData => {
  const cardElement = createCard(cardData);
  document.body.appendChild(cardElement);
});

