import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    submitCallback;
    form;
    submitButton;
    constructor(selector, submitCallback) {
        super(selector);
        const form = this.popupElement.querySelector("form");
        const submitButton = form?.querySelector(".popup__button");
        if (!form || !submitButton) {
            throw new Error("No se encontró el formulario o su botón de envío.");
        }
        this.form = form;
        this.submitButton = submitButton;
        this.submitCallback = submitCallback;
    }
    getInputValues() {
        const inputs = this.form.querySelectorAll("input");
        const values = {};
        inputs.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    async handleSubmit(event) {
        event.preventDefault();
        const originalButtonText = this.submitButton.textContent ?? "Guardar";
        this.submitButton.textContent = "Guardando...";
        this.submitButton.disabled = true;
        try {
            await this.submitCallback(this.getInputValues());
        }
        catch (error) {
            console.error("No se pudo completar el envío del formulario:", error);
        }
        finally {
            this.submitButton.textContent = originalButtonText;
            this.submitButton.disabled = !this.form.checkValidity();
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", (event) => {
            void this.handleSubmit(event);
        });
    }
    close() {
        super.close();
        this.form.reset();
    }
}
//# sourceMappingURL=PopupWithForm.js.map