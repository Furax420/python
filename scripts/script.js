document.addEventListener('DOMContentLoaded', () => {
    const loadingSection = document.getElementById('loadingSection');
    const mainContent = document.getElementById('mainContent');
    const particlesBackground = document.getElementById('particles-background');
    const particlesForeground = document.getElementById('particles-foreground');
    const body = document.body;

    document.getElementById('buttonLink').addEventListener('click', () => {
      
        setTimeout(() => {
           // redirection vert la page d'accueil
            window.location.href = '../accueil.html';
        }, 500); // Durée de l'animation en ms
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

  if (parseInt(cardData.id.replace(/[^\d.]/g, '')) % 2 === 0) {
    card.style.boxShadow = '0px 0px 0px 5px #ffde57';
  } else {
    card.style.boxShadow = '0px 0px 0px 5px #4584b6';
  }
  card.onclick = () => openModal(cardData);
  return card;
}

function openModal(cardData) {
  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal__content';

  const image = document.createElement('img');
  image.src = cardData.imageModal;
  image.alt = cardData.title;
  image.className = 'modal__image';

  const modalMain = document.createElement('div');
  modalMain.className = 'modal__main';

  const modalText = document.createElement('div');
  modalText.className = 'modal__text';
  modalText.innerHTML = cardData.fullText;

  // Ajout de l'image et du texte principal à modalMain
  modalMain.appendChild(modalText);

  // Vérifie si un lien de redirection et un texte pour le bouton sont fournis et non vides
  if (cardData.redirectionLink && cardData.redirectionLink.trim() !== '' &&
      cardData.redirectButtonText && cardData.redirectButtonText.trim() !== '') {
    const redirectButton = document.createElement('a');
    redirectButton.href = cardData.redirectionLink;
    redirectButton.className = 'btn cube cube-hover modal__redirect';
    redirectButton.innerHTML = `
      <div class="bg-top"><div class="bg-inner"></div></div>
      <div class="bg-right"><div class="bg-inner"></div></div>
      <div class="bg"><div class="bg-inner"></div></div>
      <div class="text">${cardData.redirectButtonText}</div>
    `;
    // Ajout du bouton de redirection à modalMain
    modalMain.appendChild(redirectButton);
  }

  // Ajout de modalMain à modalContent
  modalContent.appendChild(image);
  modalContent.appendChild(modalMain);

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn cube cube-hover modal__close';
  closeButton.innerHTML = `
    <div class="bg-top"><div class="bg-inner"></div></div>
    <div class="bg-right"><div class="bg-inner"></div></div>
    <div class="bg"><div class="bg-inner"></div></div>
    <div class="text">Fermer</div>
  `;
  closeButton.onclick = () => modal.remove();

  // Ajout de modalContent et closeButton à modal
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  modal.onclick = (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  };

  document.body.appendChild(modal);
}



// Obtenez le nom de la page actuelle
var pageName = window.location.pathname.split("/").pop().split(".")[0];

// Ajoutez la classe "active" au lien de navigation correspondant
var navLink = document.querySelector(".nav-redirect." + pageName);
if (navLink) {
    navLink.classList.add("active");
}