import type { CardData } from "../types/types.js";

export interface CardHandlers {
  onImageClick: (name: string, link: string) => void;
  onLikeClick: (data: CardData) => Promise<CardData>;
  onDeleteClick: (data: CardData, cardElement: HTMLElement) => void;
}

export class Card {
  private readonly data: CardData;
  private readonly templateSelector: string;
  private readonly currentUserId: string;
  private readonly handlers: CardHandlers;

  constructor(
    data: CardData,
    templateSelector: string,
    currentUserId: string,
    handlers: CardHandlers,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.currentUserId = currentUserId;
    this.handlers = handlers;
  }

  private getTemplate(): HTMLTemplateElement {
    const template = document.querySelector<HTMLTemplateElement>(
      this.templateSelector,
    );

    if (!template) {
      throw new Error("No se encontró el template de la tarjeta.");
    }

    return template;
  }

  private setEventListeners(cardElement: HTMLElement): void {
    const likeButton = cardElement.querySelector<HTMLButtonElement>(
      ".card__like-button",
    );
    const deleteButton = cardElement.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    );
    const cardImage = cardElement.querySelector<HTMLImageElement>(
      ".card__image",
    );

    if (!likeButton || !deleteButton || !cardImage) {
      throw new Error("No se encontró el marcado necesario de la tarjeta.");
    }

    likeButton.classList.toggle(
      "card__like-button_is-active",
      this.data.isLiked,
    );

    likeButton.addEventListener("click", () => {
      void this.handleLikeClick(likeButton);
    });

    if (this.data.owner !== this.currentUserId) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener("click", () => {
        this.handlers.onDeleteClick(this.data, cardElement);
      });
    }

    cardImage.addEventListener("click", () => {
      this.handlers.onImageClick(this.data.name, this.data.link);
    });
  }

  private async handleLikeClick(likeButton: HTMLButtonElement): Promise<void> {
    likeButton.disabled = true;

    try {
      const updatedCard = await this.handlers.onLikeClick(this.data);
      this.data.isLiked = updatedCard.isLiked;
      likeButton.classList.toggle(
        "card__like-button_is-active",
        updatedCard.isLiked,
      );
    } catch (error) {
      console.error("No se pudo actualizar el Me gusta:", error);
    } finally {
      likeButton.disabled = false;
    }
  }

  public generateCard(): HTMLElement {
    const cardTemplate = this.getTemplate().content.querySelector<HTMLElement>(
      ".card",
    );

    if (!cardTemplate) {
      throw new Error("No se encontró el marcado de la tarjeta.");
    }

    const cardElement = cardTemplate.cloneNode(true);

    if (!(cardElement instanceof HTMLElement)) {
      throw new Error("No se pudo clonar la tarjeta.");
    }

    const cardImage = cardElement.querySelector<HTMLImageElement>(
      ".card__image",
    );
    const cardTitle = cardElement.querySelector<HTMLElement>(".card__title");

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
