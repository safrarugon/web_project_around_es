//--Archivo de tipos que contiene las definiciones de interfaces y tipos utilizados en la aplicación.
//Definición de la interfaz SectionConfig que representa la configuración de una sección de elementos en el DOM
export interface SectionConfig<T> {
  items: T[];
  renderer: (item: T) => void;
}
//Definición de la interfaz CardData que representa los datos de una tarjeta
export interface CardData {
  name: string;
  link: string;
}
//Definición de la interfaz UserInfoData que representa la información del usuario
export interface UserInfoData {
  name: string;
  description: string;
}
//Definición de la interfaz UserInfoSelectors que representa los selectores para obtener los elementos del nombre y la descripción del usuario en el DOM
export interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
}
//Definición de la interfaz FormValidatorConfig que representa la configuración para la validación de formularios
export interface FormValidatorConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}
//Definición del tipo PopupWithFormSubmitData que representa los datos enviados desde un formulario en un popup
export type PopupWithFormSubmitData = Record<string, string>;
//Definición del tipo SubmitCallback que representa la función de callback que se ejecuta al enviar un formulario en un popup
export type SubmitCallback = (
  values: PopupWithFormSubmitData,
) => void;
