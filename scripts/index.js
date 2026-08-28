//Cards data
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
//Variables de perfil
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#edit-popup");
const profileEditCloseBtn = profileEditPopup.querySelector(".popup__close");
const profileEditForm = profileEditPopup.querySelector("#edit-profile-form");
const profileEditTitle = profileEditForm.querySelector(
  ".popup__input_type_name",
);
const profileEditDescription = profileEditForm.querySelector(
  ".popup__input_type_description",
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//-----variables de cards
const cardAddBtn = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const cardEditCloseBtn = newCardPopup.querySelector(".popup__close");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
const newCardLink = newCardForm.querySelector(".popup__input_type_url");

//--Funciones de Apertura y cierre de Modal
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

//--Funciones de Modal de Perfil
function fillProfileForm() {
  profileEditTitle.setAttribute("value", profileTitle.textContent);
  profileEditDescription.setAttribute("value", profileDescription.textContent);
}
function handleOpenEditModal() {
  openModal(profileEditPopup);
  fillProfileForm();
}
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileEditTitle.value;
  profileDescription.textContent = profileEditDescription.value;
}

profileEditBtn.addEventListener("click", () => {
  handleOpenEditModal();
});

profileEditCloseBtn.addEventListener("click", () => {
  closeModal(profileEditPopup);
});
profileEditForm.addEventListener("submit", (event) => {
  handleProfileFormSubmit(event);
  closeModal(profileEditPopup);
});

//--Funciones de Modal de Cards
function handleOpenCardModal() {
  openModal(newCardPopup);
}
cardAddBtn.addEventListener("click", () => {
  handleOpenCardModal();
});
cardEditCloseBtn.addEventListener("click", () => {
  closeModal(newCardPopup);
});
function handleCardFormSubmit(event) {
  event.preventDefault();
  renderCard(newCardName.value, newCardLink.value);
  newCardName.value = "";
  newCardLink.value = "";
}
newCardForm.addEventListener("submit", (event) => {
  handleCardFormSubmit(event);
  closeModal(newCardPopup);
});

//--Funciones de Renderizado de Cards
function renderCard(name, link) {
  const cardElement = getCardElement(name, link);
  const cardsContainer = document.querySelector(".cards__list");
  cardsContainer.append(cardElement);
}
function getCardElement(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });
  cardImage.addEventListener("click", function () {
    const imagePopup = document.querySelector("#image-popup");
    const imagePopupImage = imagePopup.querySelector(".popup__image");
    const imagePopupCaption = imagePopup.querySelector(".popup__caption");
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
  });
  return cardElement;
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});
//--Funcion para cerrar el modal de imagen
const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close");
imagePopupCloseBtn.addEventListener("click", () => {
  closeModal(imagePopup);
});
