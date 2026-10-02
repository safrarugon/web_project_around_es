//--Clase que representa una tarjeta
//importacion de tipos
//tipo de datos de la tarjeta
import type { CardData } from "../types/types.js";

//tipo de manejador de clic en la tarjeta
type CardClickHandler = (name: string, link: string) => void;

//Clase que representa una tarjeta
export class Card {
  //Propiedades privadas de la clase
  private readonly data: CardData;
  private readonly templateSelector: string;
  private readonly handleCardClick: CardClickHandler;
  //constructor de la clase se inicializa con los datos de la tarjeta, el selector del template y el manejador de clic
  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: CardClickHandler,
  ) {
    //Inicialización de las propiedades de la clase
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }
  //Método privado que obtiene el template de la tarjeta del DOM
  private getTemplate(): HTMLTemplateElement {
    //Obtención del template de la tarjeta del DOM
    const template = document.querySelector<HTMLTemplateElement>(
      this.templateSelector,
    );
    //Si no se encuentra el template, se lanza un error
    if (!template) {
      throw new Error("No se encontró el template de la tarjeta.");
    }
    //Se retorna el template de la tarjeta
    return template;
  }

  //Método privado que establece los manejadores de eventos de la tarjeta
  private setEventListeners(cardElement: HTMLElement): void {
    //Obtención de los elementos de la tarjeta del DOM
    const likeButton = cardElement.querySelector<HTMLButtonElement>(
      ".card__like-button",
    );
    const deleteButton = cardElement.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    );
    const cardImage = cardElement.querySelector<HTMLImageElement>(
      ".card__image",
    );
    //Si no se encuentran los elementos necesarios, se lanza un error
    if (!likeButton || !deleteButton || !cardImage) {
      throw new Error("No se encontró el marcado necesario de la tarjeta.");
    }
    //Se establecen los manejadores de eventos de la tarjeta
    //Manejador de clic en el botón de "me gusta"
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });
    //Manejador de clic en el botón de "eliminar"
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
    //Manejador de clic en la imagen de la tarjeta
    cardImage.addEventListener("click", () => {
      this.handleCardClick(this.data.name, this.data.link);
    });
  }
  //Método público que genera el elemento de la tarjeta a partir del template y los datos
  public generateCard(): HTMLElement {
    //Obtención del template de la tarjeta del DOM
    const cardTemplate = this.getTemplate().content.querySelector<HTMLElement>(
      ".card",
    );
    //Si no se encuentra el marcado de la tarjeta, se lanza un error
    if (!cardTemplate) {
      throw new Error("No se encontró el marcado de la tarjeta.");
    }
    //Clonación del template de la tarjeta
    const cardElement = cardTemplate.cloneNode(true);
    //Si el elemento clonado no es un HTMLElement, se lanza un error
    if (!(cardElement instanceof HTMLElement)) {
      throw new Error("No se pudo clonar la tarjeta.");
    }
    //Obtención de los elementos de la tarjeta del DOM
    const cardImage = cardElement.querySelector<HTMLImageElement>(
      ".card__image",
    );
    const cardTitle = cardElement.querySelector<HTMLElement>(".card__title");
    //Si no se encuentran los elementos necesarios, se lanza un error
    if (!cardImage || !cardTitle) {
      throw new Error("No se encontró el marcado necesario de la tarjeta.");
    }
    //Se establecen los atributos y el contenido de los elementos de la tarjeta
    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardTitle.textContent = this.data.name;
    //Se establecen los manejadores de eventos de la tarjeta
    this.setEventListeners(cardElement);
    //Se retorna el elemento de la tarjeta
    return cardElement;
  }
}
