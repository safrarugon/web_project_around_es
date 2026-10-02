import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { defaultFormConfig } from "../utils/constants.js";
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
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`No se encontró el elemento: ${selector}`);
    }
    return element;
}
const profileEditButton = getElement(".profile__edit-button");
const cardAddButton = getElement(".profile__add-button");
const profileEditForm = getElement("#edit-profile-form");
const newCardForm = getElement("#new-card-form");
const profileEditName = getElement(".popup__input_type_name");
const profileEditDescription = getElement(".popup__input_type_description");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const profileValidator = new FormValidator(defaultFormConfig, profileEditForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
let cardsSection;
const renderCard = (data) => {
    if (!cardsSection) {
        throw new Error("La sección de tarjetas no está inicializada.");
    }
    const card = new Card(data, "#card-template", (name, link) => {
        imagePopup.open(name, link);
    });
    cardsSection.addItem(card.generateCard());
};
cardsSection = new Section({
    items: initialCards,
    renderer: renderCard,
}, ".cards__list");
cardsSection.renderItems();
let profilePopup;
profilePopup = new PopupWithForm("#edit-popup", (values) => {
    userInfo.setUserInfo({
        name: values.name ?? "",
        description: values.description ?? "",
    });
    profilePopup.close();
});
profilePopup.setEventListeners();
let newCardPopup;
newCardPopup = new PopupWithForm("#new-card-popup", (values) => {
    const name = values["place-name"];
    const link = values.link;
    if (!cardsSection || !name || !link) {
        return;
    }
    const card = new Card({ name, link }, "#card-template", (cardName, cardLink) => {
        imagePopup.open(cardName, cardLink);
    });
    cardsSection.addItem(card.generateCard());
    newCardPopup.close();
});
newCardPopup.setEventListeners();
profileEditButton.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    profileEditName.value = currentUserInfo.name;
    profileEditDescription.value = currentUserInfo.description;
    profileValidator.resetValidation();
    profilePopup.open();
});
cardAddButton.addEventListener("click", () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});
profileValidator.enableValidation();
newCardValidator.enableValidation();
//# sourceMappingURL=index.js.map