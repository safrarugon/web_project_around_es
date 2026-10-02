import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    open(name, link) {
        if (name === undefined || link === undefined) {
            throw new Error("La imagen necesita un nombre y un enlace.");
        }
        const image = this.popupElement.querySelector(".popup__image");
        const caption = this.popupElement.querySelector(".popup__caption");
        if (!image || !caption) {
            throw new Error("No se encontró el marcado de la imagen.");
        }
        image.src = link;
        image.alt = name;
        caption.textContent = name;
        super.open();
    }
}
//# sourceMappingURL=PopupWithImage.js.map