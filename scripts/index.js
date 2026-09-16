//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Importación de validación de formularios------------------------------------------------
//Importación de la funciónes desde el archivo validate.js-----------------------------------------------
import { checkFormValidity, resetFormValidation } from "./validate.js";
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Cards data------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//Array de objetos con los datos de las cards------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Variables de perfil---------------------------------------------------------------------
//Obteiene el botón de edición de perfil-----------------------------------------------------------------
const profileEditBtn = document.querySelector(".profile__edit-button");
//Obtener el modal de edición de perfil------------------------------------------------------------------
const profileEditPopup = document.querySelector("#edit-popup");
//Obtiene el botón de cierre del modal de edición de perfil----------------------------------------------
const profileEditCloseBtn = profileEditPopup.querySelector(".popup__close");
//Obtiene el formulario de edición de perfil-------------------------------------------------------------
const profileEditForm = profileEditPopup.querySelector("#edit-profile-form");
//Obtiene el input de nombre del perfil------------------------------------------------------------------
const profileEditTitle = profileEditForm.querySelector(
  ".popup__input_type_name",
);
//Obtiene el input de descripción del perfil-------------------------------------------------------------
const profileEditDescription = profileEditForm.querySelector(
  ".popup__input_type_description",
);
//Obtiene el título del perfil---------------------------------------------------------------------------
const profileTitle = document.querySelector(".profile__title");
//Obtiene la descripción del perfil----------------------------------------------------------------------
const profileDescription = document.querySelector(".profile__description");
//Obtiene el botón de envío del formulario de edición de perfil------------------------------------------
const profileEditSubmitButton = profileEditForm.querySelector(".popup__button");
//Obtiene todos los inputs del formulario de edición de perfil-------------------------------------------
const inputs = profileEditForm.querySelectorAll(".popup__input");
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Variables de cards----------------------------------------------------------------------
//Obtiene el botón de añadir card------------------------------------------------------------------------
const cardAddBtn = document.querySelector(".profile__add-button");
//Obtiene el modal de añadir card------------------------------------------------------------------------
const newCardPopup = document.querySelector("#new-card-popup");
//Obtiene el botón de cierre del modal de añadir card-----------------------------------------------------
const newCardCloseBtn = newCardPopup.querySelector(".popup__close");
//Obtiene el formulario de añadir card------------------------------------------------------------------
const newCardForm = newCardPopup.querySelector("#new-card-form");
//Obtiene el input de nombre de la card------------------------------------------------------------------
const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
//Obtiene el input de enlace de la card------------------------------------------------------------------
const newCardLink = newCardForm.querySelector(".popup__input_type_url");
//Obtiene el botón de envío del formulario de añadir card------------------------------------------------
const newCardSubmitButton = newCardForm.querySelector(".popup__button");
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Validación de formularios---------------------------------------------------------------
//Evento input del formulario de perfil------------------------------------------------------------------
profileEditForm.addEventListener("input", () => {
  //Llamada a la función checkFormValidity para validar el formulario de perfil--------------------------
  checkFormValidity(profileEditForm, profileEditSubmitButton);
});
//Evento input del formulario de card--------------------------------------------------------------------
newCardForm.addEventListener("input", () => {
  //Llamada a la función checkFormValidity para validar el formulario de card----------------------------
  checkFormValidity(newCardForm, newCardSubmitButton);
});
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Funciones de Apertura y cierre de Modal-------------------------------------------------
//Funcion para abrir modal-------------------------------------------------------------------------------
function openModal(modal) {
  //Agrega clase de pertura------------------------------------------------------------------------------
  modal.classList.add("popup_is-opened");
}
//Funcion para cerrar el modal---------------------------------------------------------------------------
function closeModal(modal) {
  //Quita clase de apertura------------------------------------------------------------------------------
  modal.classList.remove("popup_is-opened");
  resetFormValidation(modal);
}
//Funcion para cerrar el modal al hacer click fuera del contenido----------------------------------------
function handleOverlayClick(event) {
  //Verifica si el click fue en el overlay y no en el contenido del modal--------------------------------
  if (event.target === event.currentTarget) {
    //Llamada a la función de cierre del modal-----------------------------------------------------------
    closeModal(event.currentTarget);
  }
}
//Funcion para cerrar el modal al presionar la tecla Escape-----------------------------------------------
function handleEscKeydown(event) {
  //Verifica si la tecla presionada es Escape-------------------------------------------------------------
  if (event.key === "Escape") {
    //Obtiene el modal abierto----------------------------------------------------------------------------
    const openedModal = document.querySelector(".popup_is-opened");
    //Valida si hay un modal abierto y llama a la función de cierre del modal-----------------------------
    if (openedModal) {
      //Llamada a la función de cierre del modal----------------------------------------------------------
      closeModal(openedModal);
    }
  }
}
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Funciones de Modal de Perfil------------------------------------------------------------
//Funcion para llenar el formulario de perfil con los datos actuales del perfil--------------------------
function fillProfileForm() {
  //Coloca dato de nombre--------------------------------------------------------------------------------
  profileEditTitle.setAttribute("value", profileTitle.textContent);
  //Coloca dato de descripcion de perfil-----------------------------------------------------------------
  profileEditDescription.setAttribute("value", profileDescription.textContent);
}
//Funcion para abrir el modal de perfil y llenar el formulario con los datos actuales del perfil---------
function handleOpenEditModal() {
  //Llama a la función de apertura de modal de perfil----------------------------------------------------
  openModal(profileEditPopup);
  //Llamar a la funcion de llenado de datos del modal----------------------------------------------------
  fillProfileForm();
}
//Funcion para guardar los datos del formulario de perfil en el contenedor de perfil----------------------
function handleProfileFormSubmit(event) {
  //Previene el comportamiento por defecto del formulario------------------------------------------------
  event.preventDefault();
  //Coloca los valores del formulario en el perfil-------------------------------------------------------
  profileTitle.textContent = profileEditTitle.value;
  profileDescription.textContent = profileEditDescription.value;
}
//Evento de apertura del modal de perfil-----------------------------------------------------------------
profileEditBtn.addEventListener("click", () => {
  //Llamada a la función de apertura del modal de perfil-------------------------------------------------
  handleOpenEditModal();
});
//Evento de cierre del modal de perfil-------------------------------------------------------------------
profileEditCloseBtn.addEventListener("click", () => {
  //Llamada a la función de cierre del modal de perfil---------------------------------------------------
  closeModal(profileEditPopup);
});
//Evento de guardado del perfil--------------------------------------------------------------------------
profileEditForm.addEventListener("submit", (event) => {
  //Llamada a la función de guardado del perfil----------------------------------------------------------
  handleProfileFormSubmit(event);
  //Llamada a la función de cierre del modal de perfil---------------------------------------------------
  closeModal(profileEditPopup);
});
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Funciones de Modal de Cards
//Funcion para abrir el modal de nuevo card--------------------------------------------------------------
function handleOpenCardModal() {
  //Llamada a la función de apertura de modal de nuevo card----------------------------------------------
  openModal(newCardPopup);
}
//Funcion para colocar los valores del formulario de nuevo card en el contenedor de cards----------------
function handleCardFormSubmit(event) {
  //Previene el comportamiento por defecto del formulario------------------------------------------------
  event.preventDefault();
  //Llamada a la función de renderizado de card----------------------------------------------------------
  renderCard(newCardName.value, newCardLink.value, true);
  //Reinicializa los valores del formulario--------------------------------------------------------------
  newCardName.value = "";
  newCardLink.value = "";
}
//Evento de apertura del modal de nuevo card-------------------------------------------------------------
cardAddBtn.addEventListener("click", () => {
  //Llamada a la función de apertura del modal de nuevo card---------------------------------------------
  handleOpenCardModal();
});
//Evento de cierre del modal de nuevo card--------------------------------------------------------------
newCardCloseBtn.addEventListener("click", () => {
  //Llamada a la función de cierre del modal de nuevo card----------------------------------------------
  closeModal(newCardPopup);
});
//Evento de guardado del nuevo card----------------------------------------------------------------------
newCardForm.addEventListener("submit", (event) => {
  //Llamada a la función que agrega la nueva card al contenedor de cards---------------------------------
  handleCardFormSubmit(event);
  //Llamada a la función de cierre del modal de nuevo card-----------------------------------------------
  closeModal(newCardPopup);
});
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Funciones de Renderizado de Cards-------------------------------------------------------
//Funcion para renderizar la card en el contenedor de cards----------------------------------------------
function renderCard(name, link, prepend = false) {
  //Obtiene el elemento card con los valores del formulario de nuevo card--------------------------------
  const cardElement = getCardElement(name, link);
  //Obtiene la lista de cards----------------------------------------------------------------------------
  const cardsContainer = document.querySelector(".cards__list");
  //Valida si se debe agregar la card al inicio o al final del contenedor de cards-----------------------
  if (prepend) {
    //Agrega la card al inicio del contenedor de cards---------------------------------------------------
    cardsContainer.prepend(cardElement);
  } else {
    //Agrega la card al final del contenedor de cards----------------------------------------------------
    cardsContainer.append(cardElement);
  }
}
//Funcion para obtener el elemento card con los valores del formulario de nuevo card---------------------
function getCardElement(name, link) {
  //Obtiene el template de la card para clonar su contenido----------------------------------------------
  const cardTemplate = document.querySelector("#card-template").content;
  //Obtiene el elemento card del template y lo clona para crear una nueva card---------------------------
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  //Obtiene el elemento imagen del card------------------------------------------------------------------
  const cardImage = cardElement.querySelector(".card__image");
  //Obtiene el elemento título del card------------------------------------------------------------------
  const cardTitle = cardElement.querySelector(".card__title");
  //Coloca los valores de la card en los elementos correspondientes--------------------------------------
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  //Obtiene el botón de like-----------------------------------------------------------------------------
  const likeButton = cardElement.querySelector(".card__like-button");
  //Evento de like del card------------------------------------------------------------------------------
  likeButton.addEventListener("click", function (evt) {
    //Agrega o quita la clase de like del botón de like--------------------------------------------------
    evt.target.classList.toggle("card__like-button_is-active");
  });
  //Obtiene el botón de eliminar--------------------------------------------------------------------------
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //Evento de eliminar del card---------------------------------------------------------------------------
  deleteButton.addEventListener("click", function () {
    //Elimina la card del contenedor de cards-------------------------------------------------------------
    cardElement.remove();
  });
  //Evento de apertura del modal de imagen del card-------------------------------------------------------
  cardImage.addEventListener("click", function () {
    //Obtiene el modal de imagen y sus elementos----------------------------------------------------------
    const imagePopup = document.querySelector("#image-popup");
    //Obtiene el elemento de imagen y el caption del modal de imagen--------------------------------------
    const imagePopupImage = imagePopup.querySelector(".popup__image");
    const imagePopupCaption = imagePopup.querySelector(".popup__caption");
    //Coloca los valores de la card en los elementos del modal de imagen----------------------------------
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    //Llamada a la función de apertura del modal de imagen------------------------------------------------
    openModal(imagePopup);
  });
  //Devuelve el elemento de la card-----------------------------------------------------------------------
  return cardElement;
}
//Iteración sobre el array de objetos initialCards para renderizar cada card en el contenedor de cards----
initialCards.forEach((card) => {
  //Llama a la función de renderizado de cards------------------------------------------------------------
  renderCard(card.name, card.link);
});
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//---------------Funcion para cerrar el modal de imagen---------------------------------------------------
//Obtiene el modal de imagen------------------------------------------------------------------------------
const imagePopup = document.querySelector("#image-popup");
//Obtiene el boton de cierre del modal de imagen----------------------------------------------------------
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close");
//Evento de cierre del modal de imagen--------------------------------------------------------------------
imagePopupCloseBtn.addEventListener("click", () => {
  //Llamada a la función de cierre del modal de imagen----------------------------------------------------
  closeModal(imagePopup);
});
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//---------------Cerrar modales al hacer clic fuera-------------------------------------------------------
//Evento de cierre del modal al hacer clic fuera del contenido--------------------------------------------
profileEditPopup.addEventListener("mousedown", handleOverlayClick);
newCardPopup.addEventListener("mousedown", handleOverlayClick);
imagePopup.addEventListener("mousedown", handleOverlayClick);

//---------------Cerrar modales con Escape----------------------------------------------------------------
//Evento de cierre del modal al presionar la tecla Escape-------------------------------------------------
document.addEventListener("keydown", handleEscKeydown);
