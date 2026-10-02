export class FormValidator {
    config;
    form;
    constructor(config, form) {
        this.config = config;
        this.form = form;
    }
    showInputError(input) {
        const errorElement = this.form.querySelector(`.${input.name}-error`);
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
    toggleButtonState() {
        const submitButton = this.form.querySelector(this.config.submitButtonSelector);
        if (!submitButton) {
            return;
        }
        const isFormInvalid = !this.form.checkValidity();
        submitButton.disabled = isFormInvalid;
        submitButton.classList.toggle(this.config.inactiveButtonClass, isFormInvalid);
    }
    setEventListeners() {
        const inputs = this.form.querySelectorAll(this.config.inputSelector);
        inputs.forEach((input) => {
            input.addEventListener("input", (event) => {
                if (!(event.currentTarget instanceof HTMLInputElement)) {
                    return;
                }
                this.showInputError(event.currentTarget);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
        this.toggleButtonState();
    }
    resetValidation() {
        const inputs = this.form.querySelectorAll(this.config.inputSelector);
        inputs.forEach((input) => {
            input.classList.remove(this.config.inputErrorClass);
            const errorElement = this.form.querySelector(`.${input.name}-error`);
            if (errorElement) {
                errorElement.textContent = "";
                errorElement.classList.remove(this.config.errorClass);
            }
        });
        this.toggleButtonState();
    }
}
//# sourceMappingURL=FormValidator.js.map