import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    confirmButton;
    submitAction = null;
    constructor(selector) {
        super(selector);
        const confirmButton = this.popupElement.querySelector(".popup__confirm-button");
        if (!confirmButton) {
            throw new Error("No se encontró el botón de confirmación.");
        }
        this.confirmButton = confirmButton;
    }
    setSubmitAction(action) {
        this.submitAction = action;
    }
    async handleConfirm() {
        if (!this.submitAction) {
            return;
        }
        const originalButtonText = this.confirmButton.textContent ?? "Sí";
        this.confirmButton.textContent = "Eliminando...";
        this.confirmButton.disabled = true;
        try {
            await this.submitAction();
            this.close();
        }
        catch (error) {
            console.error("No se pudo eliminar la tarjeta:", error);
        }
        finally {
            this.confirmButton.textContent = originalButtonText;
            this.confirmButton.disabled = false;
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", () => {
            void this.handleConfirm();
        });
    }
    close() {
        super.close();
        this.submitAction = null;
    }
}
//# sourceMappingURL=PopupWithConfirmation.js.map