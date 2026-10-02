export class Card {
    data;
    templateSelector;
    handleCardClick;
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const template = document.querySelector(this.templateSelector);
        if (!template) {
            throw new Error("No se encontró el template de la tarjeta.");
        }
        return template;
    }
    setEventListeners(cardElement) {
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        const cardImage = cardElement.querySelector(".card__image");
        if (!likeButton || !deleteButton || !cardImage) {
            throw new Error("No se encontró el marcado necesario de la tarjeta.");
        }
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        deleteButton.addEventListener("click", () => {
            cardElement.remove();
        });
        cardImage.addEventListener("click", () => {
            this.handleCardClick(this.data.name, this.data.link);
        });
    }
    generateCard() {
        const cardTemplate = this.getTemplate().content.querySelector(".card");
        if (!cardTemplate) {
            throw new Error("No se encontró el marcado de la tarjeta.");
        }
        const cardElement = cardTemplate.cloneNode(true);
        if (!(cardElement instanceof HTMLElement)) {
            throw new Error("No se pudo clonar la tarjeta.");
        }
        const cardImage = cardElement.querySelector(".card__image");
        const cardTitle = cardElement.querySelector(".card__title");
        if (!cardImage || !cardTitle) {
            throw new Error("No se encontró el marcado necesario de la tarjeta.");
        }
        cardImage.src = this.data.link;
        cardImage.alt = this.data.name;
        cardTitle.textContent = this.data.name;
        this.setEventListeners(cardElement);
        return cardElement;
    }
}
//# sourceMappingURL=Card.js.map