import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    submitCallback;
    form;
    constructor(selector, submitCallback) {
        super(selector);
        const form = this.popupElement.querySelector("form");
        if (!form) {
            throw new Error("No se encontró el formulario.");
        }
        this.form = form;
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
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.submitCallback(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.form.reset();
    }
}
//# sourceMappingURL=PopupWithForm.js.map