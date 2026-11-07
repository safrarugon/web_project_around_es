import type { FormValidatorConfig } from "../types/types.js";

export class FormValidator {
  private readonly config: FormValidatorConfig;
  private readonly form: HTMLFormElement;

  constructor(config: FormValidatorConfig, form: HTMLFormElement) {
    this.config = config;
    this.form = form;
  }

  private showInputError(input: HTMLInputElement): void {
    const errorElement = this.form.querySelector<HTMLElement>(
      `.${input.name}-error`,
    );

    if (!errorElement) {
      return;
    }

    if (!input.validity.valid) {
      errorElement.textContent = input.validationMessage;
      input.classList.add(this.config.inputErrorClass);
      errorElement.classList.add(this.config.errorClass);
      return;
    }

    errorElement.textContent = "";
    input.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
  }

  private toggleButtonState(): void {
    const submitButton = this.form.querySelector<HTMLButtonElement>(
      this.config.submitButtonSelector,
    );

    if (!submitButton) {
      return;
    }

    const isFormInvalid = !this.form.checkValidity();
    submitButton.disabled = isFormInvalid;
    submitButton.classList.toggle(
      this.config.inactiveButtonClass,
      isFormInvalid,
    );
  }

  private setEventListeners(): void {
    const inputs = this.form.querySelectorAll<HTMLInputElement>(
      this.config.inputSelector,
    );

    inputs.forEach((input) => {
      input.addEventListener("input", (event: Event) => {
        if (!(event.currentTarget instanceof HTMLInputElement)) {
          return;
        }

        this.showInputError(event.currentTarget);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.setEventListeners();
    this.toggleButtonState();
  }

  public resetValidation(): void {
    const inputs = this.form.querySelectorAll<HTMLInputElement>(
      this.config.inputSelector,
    );

    inputs.forEach((input) => {
      input.classList.remove(this.config.inputErrorClass);

      const errorElement = this.form.querySelector<HTMLElement>(
        `.${input.name}-error`,
      );

      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
      }
    });

    this.toggleButtonState();
  }
}
