//--Componente para Validar formularios
//Importar el tipo FormValidatorConfig desde el archivo types.ts
import type { FormValidatorConfig } from "../types/types.js";

//Clase FormValidator para manejar la validación de formularios
export class FormValidator {
  //Propiedades privadas para almacenar la configuración y el formulario
  private readonly config: FormValidatorConfig;
  private readonly form: HTMLFormElement;

  //Constructor que recibe la configuración y el formulario a validar
  constructor(config: FormValidatorConfig, form: HTMLFormElement) {
    //Asignar la configuración y el formulario a las propiedades de la clase
    this.config = config;
    this.form = form;
  }

  //Método privado para mostrar el error de un input específico
  private showInputError(input: HTMLInputElement): void {
    //Buscar el elemento de error correspondiente al input
    const errorElement = this.form.querySelector<HTMLElement>(
      `.${input.name}-error`,
    );

    //Si no se encuentra el elemento de error, salir del método
    if (!errorElement) {
      return;
    }

    //Si el input no es válido, mostrar el mensaje de error y aplicar las clases de error  
    if (!input.validity.valid) {
      errorElement.textContent = input.validationMessage;
      input.classList.add(this.config.inputErrorClass);
      errorElement.classList.add(this.config.errorClass);
      return;
    }

    //Limpia el mensaje de error y remueve las clases de error si el input es válido
    errorElement.textContent = "";
    input.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
  }

  //Método privado para alternar el estado del botón de envío según la validez del formulario
  private toggleButtonState(): void {
    //Buscar el botón de envío en el formulario
    const submitButton = this.form.querySelector<HTMLButtonElement>(
      this.config.submitButtonSelector,
    );
    //Si no se encuentra el botón de envío, salir del método
    if (!submitButton) {
      return;
    }

    //Determinar si el formulario es inválido y actualizar el estado del botón de envío
    const isFormInvalid = !this.form.checkValidity();
    //Actualizar el estado del botón de envío y aplicar o remover la clase de botón inactivo según corresponda
    submitButton.disabled = isFormInvalid;
    submitButton.classList.toggle(
      this.config.inactiveButtonClass,
      isFormInvalid,
    );
  }

  //Método privado para establecer los manejadores de eventos en los inputs del formulario
  private setEventListeners(): void {
    //Recoge los inputs del formulario según el selector definido en la configuración 
    const inputs = this.form.querySelectorAll<HTMLInputElement>(
      this.config.inputSelector,
    );

    //Para cada input, se establece un manejador de eventos para el evento "input"
    inputs.forEach((input) => {
      input.addEventListener("input", (event: Event) => {
        if (!(event.currentTarget instanceof HTMLInputElement)) {
          return;
        }
        //Mostrar el error del input actual y alternar el estado del botón de envío
        this.showInputError(event.currentTarget);
        this.toggleButtonState();
      });
    });
  }

  //Metódo público para habilitar la validación del formulario, estableciendo los manejadores de eventos y alternando el estado del botón de envío
  public enableValidation(): void {
    this.setEventListeners();
    this.toggleButtonState();
  }

  //Método público para restablecer la validación del formulario, limpiando los errores y alternando el estado del botón de envío
  public resetValidation(): void {
    //Recoge los inputs del formulario según el selector definido en la configuración
    const inputs = this.form.querySelectorAll<HTMLInputElement>(
      this.config.inputSelector,
    );
    //Para cada input, se remueven las clases de error y se limpia el mensaje de error correspondiente
    inputs.forEach((input) => {
      input.classList.remove(this.config.inputErrorClass);

      //Buscar el elemento de error correspondiente al input
      const errorElement = this.form.querySelector<HTMLElement>(
        `.${input.name}-error`,
      );

      //Si se encuentra el elemento de error, limpiar el mensaje de error y remover la clase de error
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
      }
    });
    //Alternar el estado del botón de envío después de limpiar los errores
    this.toggleButtonState();
  }
}
