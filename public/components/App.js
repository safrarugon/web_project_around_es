import { Card } from "./Card.js";
export class App {
    api;
    userInfo;
    cardsSection;
    imagePopup;
    confirmationPopup;
    profilePopup;
    newCardPopup;
    avatarPopup;
    profileValidator;
    newCardValidator;
    avatarValidator;
    profileEditButton;
    cardAddButton;
    avatarEditButton;
    profileEditName;
    profileEditDescription;
    avatarInput;
    currentUserId = "";
    constructor(options) {
        this.api = options.api;
        this.userInfo = options.userInfo;
        this.cardsSection = options.cardsSection;
        this.imagePopup = options.imagePopup;
        this.confirmationPopup = options.confirmationPopup;
        this.profilePopup = options.profilePopup;
        this.newCardPopup = options.newCardPopup;
        this.avatarPopup = options.avatarPopup;
        this.profileValidator = options.profileValidator;
        this.newCardValidator = options.newCardValidator;
        this.avatarValidator = options.avatarValidator;
        this.profileEditButton = options.profileEditButton;
        this.cardAddButton = options.cardAddButton;
        this.avatarEditButton = options.avatarEditButton;
        this.profileEditName = options.profileEditName;
        this.profileEditDescription = options.profileEditDescription;
        this.avatarInput = options.avatarInput;
    }
    async start() {
        this.imagePopup.setEventListeners();
        this.confirmationPopup.setEventListeners();
        this.profilePopup.setEventListeners();
        this.newCardPopup.setEventListeners();
        this.avatarPopup.setEventListeners();
        this.profileValidator.enableValidation();
        this.newCardValidator.enableValidation();
        this.avatarValidator.enableValidation();
        try {
            const [userData, initialCards] = await Promise.all([
                this.api.getUserInfo(),
                this.api.getInitialCards(),
            ]);
            this.currentUserId = userData._id;
            this.userInfo.setUserInfo(this.toUserInfoData(userData));
            this.cardsSection.renderItems(initialCards);
            this.setControlEventListeners();
        }
        catch (error) {
            console.error("No se pudieron cargar los datos iniciales:", error);
        }
    }
    renderCard(data) {
        if (!this.currentUserId) {
            throw new Error("No se pueden renderizar tarjetas antes de cargar el usuario.");
        }
        const card = new Card(data, "#card-template", this.currentUserId, {
            onImageClick: (name, link) => this.imagePopup.open(name, link),
            onLikeClick: (cardData) => this.changeLikeCardStatus(cardData),
            onDeleteClick: (cardData, cardElement) => {
                this.openDeleteConfirmation(cardData, cardElement);
            },
        });
        this.cardsSection.addItem(card.generateCard());
    }
    async updateProfile(values) {
        const name = values.name?.trim();
        const about = values.description?.trim();
        if (!name || !about) {
            throw new Error("El nombre y la descripción del perfil son obligatorios.");
        }
        const updatedUser = await this.api.setUserInfo({ name, about });
        this.userInfo.setUserInfo(this.toUserInfoData(updatedUser));
        this.profilePopup.close();
    }
    async addCard(values) {
        const name = values["place-name"]?.trim();
        const link = values.link?.trim();
        if (!name || !link) {
            throw new Error("El título y el enlace de la tarjeta son obligatorios.");
        }
        const newCard = await this.api.addCard({ name, link });
        this.cardsSection.renderItems([newCard]);
        this.newCardPopup.close();
    }
    async updateAvatar(values) {
        const avatar = values.avatar?.trim();
        if (!avatar) {
            throw new Error("El enlace del avatar es obligatorio.");
        }
        const updatedUser = await this.api.setUserAvatar({ avatar });
        this.userInfo.setUserInfo(this.toUserInfoData(updatedUser));
        this.avatarPopup.close();
    }
    async changeLikeCardStatus(data) {
        return await this.api.changeLikeCardStatus(data._id, !data.isLiked);
    }
    openDeleteConfirmation(data, cardElement) {
        this.confirmationPopup.setSubmitAction(async () => {
            await this.api.deleteCard(data._id);
            cardElement.remove();
        });
        this.confirmationPopup.open();
    }
    setControlEventListeners() {
        this.profileEditButton.addEventListener("click", () => {
            const currentUserInfo = this.userInfo.getUserInfo();
            this.profileEditName.value = currentUserInfo.name;
            this.profileEditDescription.value = currentUserInfo.description;
            this.profileValidator.resetValidation();
            this.profilePopup.open();
        });
        this.cardAddButton.addEventListener("click", () => {
            this.newCardValidator.resetValidation();
            this.newCardPopup.open();
        });
        this.avatarEditButton.addEventListener("click", () => {
            this.avatarInput.value = this.userInfo.getUserInfo().avatar;
            this.avatarValidator.resetValidation();
            this.avatarPopup.open();
        });
    }
    toUserInfoData(data) {
        return {
            name: data.name,
            description: data.about,
            avatar: data.avatar,
        };
    }
}
//# sourceMappingURL=App.js.map