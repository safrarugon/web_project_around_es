import type { FormValidatorConfig } from "../types/types.js";

export const API_BASE_URL =
  "https://around-api.es.tripleten-services.com/v1";

export const API_TOKEN_STORAGE_KEY = "aroundApiToken";

export const defaultFormConfig: FormValidatorConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_visible",
};
