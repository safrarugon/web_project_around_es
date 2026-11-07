import { Popup } from "./Popup.js";

type ConfirmationAction = () => Promise<void>;

export class PopupWithConfirmation extends Popup {
  private readonly confirmButton: HTMLButtonElement;
  private submitAction: ConfirmationAction | null = null;

  constructor(selector: string) {
    super(selector);

    const confirmButton = this.popupElement.querySelector<HTMLButtonElement>(
      ".popup__confirm-button",
    );

    if (!confirmButton) {
      throw new Error("No se encontró el botón de confirmación.");
    }

    this.confirmButton = confirmButton;
  }

  public setSubmitAction(action: ConfirmationAction): void {
    this.submitAction = action;
  }

  private async handleConfirm(): Promise<void> {
    if (!this.submitAction) {
      return;
    }

    const originalButtonText = this.confirmButton.textContent ?? "Sí";
    this.confirmButton.textContent = "Eliminando...";
    this.confirmButton.disabled = true;

    try {
      await this.submitAction();
      this.close();
    } catch (error) {
      console.error("No se pudo eliminar la tarjeta:", error);
    } finally {
      this.confirmButton.textContent = originalButtonText;
      this.confirmButton.disabled = false;
    }
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.confirmButton.addEventListener("click", () => {
      void this.handleConfirm();
    });
  }

  public override close(): void {
    super.close();
    this.submitAction = null;
  }
}
