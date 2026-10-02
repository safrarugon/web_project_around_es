export class Popup {
    popupElement;
    constructor(selector) {
        const popup = document.querySelector(selector);
        if (!popup) {
            throw new Error(`No se encontró el popup: ${selector}`);
        }
        this.popupElement = popup;
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    };
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton?.addEventListener("click", () => {
            this.close();
        });
        this.popupElement.addEventListener("mousedown", (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        });
    }
}
//# sourceMappingURL=Popup.js.map