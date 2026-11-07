import { Api } from "../components/Api.js";
import { App } from "../components/App.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { API_BASE_URL, API_TOKEN_STORAGE_KEY, defaultFormConfig, } from "../utils/constants.js";
function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`No se encontró el elemento: ${selector}`);
    }
    return element;
}
const apiToken = window.sessionStorage.getItem(API_TOKEN_STORAGE_KEY) ?? "";
if (!apiToken) {
    console.warn(`No se encontró un token en sessionStorage con la clave "${API_TOKEN_STORAGE_KEY}".`);
}
const api = new Api({
    baseUrl: API_BASE_URL,
    headers: {
        authorization: apiToken,
        "Content-Type": "application/json",
    },
});
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
const imagePopup = new PopupWithImage("#image-popup");
const confirmationPopup = new PopupWithConfirmation("#confirmation-popup");
const profileValidator = new FormValidator(defaultFormConfig, getElement("#edit-profile-form"));
const newCardValidator = new FormValidator(defaultFormConfig, getElement("#new-card-form"));
const avatarValidator = new FormValidator(defaultFormConfig, getElement("#avatar-form"));
let app;
function getApp() {
    if (!app) {
        throw new Error("La aplicación todavía no está inicializada.");
    }
    return app;
}
const profilePopup = new PopupWithForm("#edit-popup", (values) => getApp().updateProfile(values));
const newCardPopup = new PopupWithForm("#new-card-popup", (values) => getApp().addCard(values));
const avatarPopup = new PopupWithForm("#avatar-popup", (values) => getApp().updateAvatar(values));
const cardsSection = new Section({
    items: [],
    renderer: (cardData) => getApp().renderCard(cardData),
}, ".cards__list");
app = new App({
    api,
    userInfo,
    cardsSection,
    imagePopup,
    confirmationPopup,
    profilePopup,
    newCardPopup,
    avatarPopup,
    profileValidator,
    newCardValidator,
    avatarValidator,
    profileEditButton: getElement(".profile__edit-button"),
    cardAddButton: getElement(".profile__add-button"),
    avatarEditButton: getElement(".profile__avatar-edit-button"),
    profileEditName: getElement(".popup__input_type_name"),
    profileEditDescription: getElement(".popup__input_type_description"),
    avatarInput: getElement(".popup__input_type_avatar"),
});
void app.start();
//# sourceMappingURL=index.js.map