import type {
  PopupWithFormSubmitData,
  SubmitCallback,
} from "../types/types.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  private readonly submitCallback: SubmitCallback;
  private readonly form: HTMLFormElement;
  private readonly submitButton: HTMLButtonElement;

  constructor(selector: string, submitCallback: SubmitCallback) {
    super(selector);

    const form = this.popupElement.querySelector<HTMLFormElement>("form");
    const submitButton = form?.querySelector<HTMLButtonElement>(
      ".popup__button",
    );

    if (!form || !submitButton) {
      throw new Error("No se encontró el formulario o su botón de envío.");
    }

    this.form = form;
    this.submitButton = submitButton;
    this.submitCallback = submitCallback;
  }

  private getInputValues(): PopupWithFormSubmitData {
    const inputs = this.form.querySelectorAll<HTMLInputElement>("input");
    const values: PopupWithFormSubmitData = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  private async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const originalButtonText = this.submitButton.textContent ?? "Guardar";
    this.submitButton.textContent = "Guardando...";
    this.submitButton.disabled = true;

    try {
      await this.submitCallback(this.getInputValues());
    } catch (error) {
      console.error("No se pudo completar el envío del formulario:", error);
    } finally {
      this.submitButton.textContent = originalButtonText;
      this.submitButton.disabled = !this.form.checkValidity();
    }
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.form.addEventListener("submit", (event: SubmitEvent) => {
      void this.handleSubmit(event);
    });
  }

  public override close(): void {
    super.close();
    this.form.reset();
  }
}
