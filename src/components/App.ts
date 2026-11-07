//importaciones de clases y tipos
import { Api } from "./Api.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
import type {
  ApiUserData,
  CardData,
  PopupWithFormSubmitData,
  UserInfoData,
} from "../types/types.js";

// Definición de la interfaz AppOptions
interface AppOptions {
  api: Api;
  userInfo: UserInfo;
  cardsSection: Section<CardData>;
  imagePopup: PopupWithImage;
  confirmationPopup: PopupWithConfirmation;
  profilePopup: PopupWithForm;
  newCardPopup: PopupWithForm;
  avatarPopup: PopupWithForm;
  profileValidator: FormValidator;
  newCardValidator: FormValidator;
  avatarValidator: FormValidator;
  profileEditButton: HTMLButtonElement;
  cardAddButton: HTMLButtonElement;
  avatarEditButton: HTMLButtonElement;
  profileEditName: HTMLInputElement;
  profileEditDescription: HTMLInputElement;
  avatarInput: HTMLInputElement;
}

// Clase principal de la aplicación
export class App {
  private readonly api: Api;
  private readonly userInfo: UserInfo;
  private readonly cardsSection: Section<CardData>;
  private readonly imagePopup: PopupWithImage;
  private readonly confirmationPopup: PopupWithConfirmation;
  private readonly profilePopup: PopupWithForm;
  private readonly newCardPopup: PopupWithForm;
  private readonly avatarPopup: PopupWithForm;
  private readonly profileValidator: FormValidator;
  private readonly newCardValidator: FormValidator;
  private readonly avatarValidator: FormValidator;
  private readonly profileEditButton: HTMLButtonElement;
  private readonly cardAddButton: HTMLButtonElement;
  private readonly avatarEditButton: HTMLButtonElement;
  private readonly profileEditName: HTMLInputElement;
  private readonly profileEditDescription: HTMLInputElement;
  private readonly avatarInput: HTMLInputElement;
  private currentUserId = "";

  // Constructor de la clase App
  constructor(options: AppOptions) {
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

  // Método para iniciar la aplicación
  public async start(): Promise<void> {
    this.imagePopup.setEventListeners();
    this.confirmationPopup.setEventListeners();
    this.profilePopup.setEventListeners();
    this.newCardPopup.setEventListeners();
    this.avatarPopup.setEventListeners();
    this.profileValidator.enableValidation();
    this.newCardValidator.enableValidation();
    this.avatarValidator.enableValidation();

    // Cargar datos iniciales del usuario y las tarjetas
    try {
      const [userData, initialCards] = await Promise.all([
        this.api.getUserInfo(),
        this.api.getInitialCards(),
      ]);

      // Guardar el ID del usuario actual y actualizar la información del usuario
      this.currentUserId = userData._id;
      this.userInfo.setUserInfo(this.toUserInfoData(userData));
      this.cardsSection.renderItems(initialCards);
      this.setControlEventListeners();
    } catch (error) {
      console.error("No se pudieron cargar los datos iniciales:", error);
    }
  }

  // Método para renderizar una tarjeta
  public renderCard(data: CardData): void {
    if (!this.currentUserId) {
      throw new Error("No se pueden renderizar tarjetas antes de cargar el usuario.");
    }
    // Crear una nueva instancia de Card y pasarle los datos y las funciones de callback
    const card = new Card(
      data,
      "#card-template",
      this.currentUserId,
      {
        onImageClick: (name, link) => this.imagePopup.open(name, link),
        onLikeClick: (cardData) => this.changeLikeCardStatus(cardData),
        onDeleteClick: (cardData, cardElement) => {
          this.openDeleteConfirmation(cardData, cardElement);
        },
      },
    );
  
    // Generar el elemento de la tarjeta y agregarlo a la sección de tarjetas
    this.cardsSection.addItem(card.generateCard());
  }

  // Método para actualizar la información del perfil
  public async updateProfile(
    values: PopupWithFormSubmitData,
  ): Promise<void> {
    const name = values.name?.trim();
    const about = values.description?.trim();

    // Validar que el nombre y la descripción no estén vacíos
    if (!name || !about) {
      throw new Error("El nombre y la descripción del perfil son obligatorios.");
    }

    // Actualizar la información del usuario a través de la API y actualizar la interfaz de usuario
    const updatedUser = await this.api.setUserInfo({ name, about });
    this.userInfo.setUserInfo(this.toUserInfoData(updatedUser));
    this.profilePopup.close();
  }

  // Método para agregar una nueva tarjeta
  public async addCard(values: PopupWithFormSubmitData): Promise<void> {
    const name = values["place-name"]?.trim();
    const link = values.link?.trim();

    // Validar que el nombre y el enlace de la tarjeta no estén vacíos
    if (!name || !link) {
      throw new Error("El título y el enlace de la tarjeta son obligatorios.");
    }

    // Agregar la tarjeta a través de la API y renderizarla en la sección de tarjetas
    const newCard = await this.api.addCard({ name, link });
    this.cardsSection.renderItems([newCard]);
    this.newCardPopup.close();
  }

  // Método para actualizar el avatar del usuario
  public async updateAvatar(
    values: PopupWithFormSubmitData,
  ): Promise<void> {
    const avatar = values.avatar?.trim();

    if (!avatar) {
      throw new Error("El enlace del avatar es obligatorio.");
    }

    const updatedUser = await this.api.setUserAvatar({ avatar });
    this.userInfo.setUserInfo(this.toUserInfoData(updatedUser));
    this.avatarPopup.close();
  }

  public async changeLikeCardStatus(data: CardData): Promise<CardData> {
    return await this.api.changeLikeCardStatus(data._id, !data.isLiked);
  }

  public openDeleteConfirmation(
    data: CardData,
    cardElement: HTMLElement,
  ): void {
    this.confirmationPopup.setSubmitAction(async () => {
      await this.api.deleteCard(data._id);
      cardElement.remove();
    });

    this.confirmationPopup.open();
  }

  private setControlEventListeners(): void {
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

  private toUserInfoData(data: ApiUserData): UserInfoData {
    return {
      name: data.name,
      description: data.about,
      avatar: data.avatar,
    };
  }
}
