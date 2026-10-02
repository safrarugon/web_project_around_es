//--Archivo principal de la aplicación
//Importacion de clases y tipos
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import type { CardData } from "../types/types.js";
import { defaultFormConfig, initialCards } from "../utils/constants.js";

//Función genérica para obtener un elemento del DOM y lanzar un error si no se encuentra
function getElement<T extends Element>(selector: string): T {
  //Obtención del elemento del DOM
  const element = document.querySelector<T>(selector);
  //Si no se encuentra el elemento, se lanza un error
  if (!element) {
    throw new Error(`No se encontró el elemento: ${selector}`);
  }
  //Se retorna el elemento del DOM
  return element;
}
//Obtención de los elementos del DOM necesarios para la aplicación
const profileEditButton = getElement<HTMLButtonElement>(
  ".profile__edit-button",
);
const cardAddButton = getElement<HTMLButtonElement>(".profile__add-button");
const profileEditForm = getElement<HTMLFormElement>("#edit-profile-form");
const newCardForm = getElement<HTMLFormElement>("#new-card-form");
const profileEditName = getElement<HTMLInputElement>(
  ".popup__input_type_name",
);
const profileEditDescription = getElement<HTMLInputElement>(
  ".popup__input_type_description",
);

//Instanciación de las clases necesarias para la aplicación
//Instanciación de la clase UserInfo para manejar la información del usuario
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});
//Instanciación de la clase PopupWithImage para manejar el popup de imagen
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
//Instanciación de la clase FormValidator para manejar la validación de formulario profile
const profileValidator = new FormValidator(
  defaultFormConfig,
  profileEditForm,
);
//Instanciación de la clase FormValidator para manejar la validación de formulario new card
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);

//Instanciación de la clase Section para manejar la sección de tarjetas
let cardsSection: Section<CardData> | undefined;

//Función para renderizar una tarjeta en la sección de tarjetas
const renderCard = (data: CardData): void => {
  //Si la sección de tarjetas no está inicializada, se lanza un error
  if (!cardsSection) {
    throw new Error("La sección de tarjetas no está inicializada.");
  }

  //Instanciación de la clase Card para manejar la tarjeta
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });

  //Se agrega la tarjeta generada a la sección de tarjetas
  cardsSection.addItem(card.generateCard());
};

//Instanciación de la clase Section para manejar la sección de tarjetas con los datos iniciales
cardsSection = new Section<CardData>(
  //Se pasan los datos iniciales de las tarjetas y la función de renderizado
  {
    items: initialCards,
    renderer: renderCard,
  },
  //Se pasa el selector del contenedor de tarjetas
  ".cards__list",
);
//Se renderizan las tarjetas iniciales en la sección de tarjetas
cardsSection.renderItems();

//Instanciación de la clase PopupWithForm para manejar el popup de edición de perfil
let profilePopup: PopupWithForm;
//Se pasa el selector del popup y la función de manejo de envío del formulario
profilePopup = new PopupWithForm("#edit-popup", (values) => {
  userInfo.setUserInfo({
    name: values.name ?? "",
    description: values.description ?? "",
  });
  //Se cierra el popup de edición de perfil
  profilePopup.close();
});
//Se establecen los manejadores de eventos del popup de edición de perfil
profilePopup.setEventListeners();

//Instanciación de la clase PopupWithForm para manejar el popup de nueva tarjeta
let newCardPopup: PopupWithForm;
//Se pasa el selector del popup y la función de manejo de envío del formulario  
newCardPopup = new PopupWithForm("#new-card-popup", (values) => {
  const name = values["place-name"];
  const link = values.link;

  //Si la sección de tarjetas no está inicializada o los valores del formulario son nulos, se retorna
  if (!cardsSection || !name || !link) {
    return;
  }

  //Instanciación de la clase Card para manejar la nueva tarjeta
  const card = new Card(
    //Se pasan los valores del formulario, el selector del template y la función de manejo de clic en la tarjeta
    { name, link },
    "#card-template",
    (cardName, cardLink) => {
      imagePopup.open(cardName, cardLink);
    },
  );

  //Se agrega la nueva tarjeta generada a la sección de tarjetas
  cardsSection.addItem(card.generateCard());
  //Se cierra el popup de nueva tarjeta  
  newCardPopup.close();
});
//Se establecen los manejadores de eventos del popup de nueva tarjeta
newCardPopup.setEventListeners();

//Se establecen los manejadores de eventos de los botones de edición de perfil y nueva tarjeta
profileEditButton.addEventListener("click", () => {
  //Se obtiene la información actual del usuario
  const currentUserInfo = userInfo.getUserInfo();
  //Se establecen los valores de los campos del formulario de edición de perfil con la información actual del usuario
  profileEditName.value = currentUserInfo.name;
  profileEditDescription.value = currentUserInfo.description;
  //Se resetea la validación del formulario de edición de perfil y se abre el popup de edición de perfil
  profileValidator.resetValidation();
  //Se abre el popup de edición de perfil
  profilePopup.open();
});

//Se establece el manejador de eventos del botón de nueva tarjeta
cardAddButton.addEventListener("click", () => {
  //Se resetea la validación del formulario de nueva tarjeta y se abre el popup de nueva tarjeta
  newCardValidator.resetValidation();
  newCardPopup.open();
});

//Se habilitan las validaciones para los formularios
profileValidator.enableValidation();
//Se habilitan las validaciones para los formularios
newCardValidator.enableValidation();
