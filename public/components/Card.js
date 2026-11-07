export class Card {
    data;
    templateSelector;
    currentUserId;
    handlers;
    constructor(data, templateSelector, currentUserId, handlers) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.currentUserId = currentUserId;
        this.handlers = handlers;
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
        likeButton.classList.toggle("card__like-button_is-active", this.data.isLiked);
        likeButton.addEventListener("click", () => {
            void this.handleLikeClick(likeButton);
        });
        if (this.data.owner !== this.currentUserId) {
            deleteButton.remove();
        }
        else {
            deleteButton.addEventListener("click", () => {
                this.handlers.onDeleteClick(this.data, cardElement);
            });
        }
        cardImage.addEventListener("click", () => {
            this.handlers.onImageClick(this.data.name, this.data.link);
        });
    }
    async handleLikeClick(likeButton) {
        likeButton.disabled = true;
        try {
            const updatedCard = await this.handlers.onLikeClick(this.data);
            this.data.isLiked = updatedCard.isLiked;
            likeButton.classList.toggle("card__like-button_is-active", updatedCard.isLiked);
        }
        catch (error) {
            console.error("No se pudo actualizar el Me gusta:", error);
        }
        finally {
            likeButton.disabled = false;
        }
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