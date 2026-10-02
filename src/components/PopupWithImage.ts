//--Componente para los Popups de las imagenes de la aplicación
//importación de tipos y clases necesarias para el funcionamiento del componente PopupWithImage
import { Popup } from "./Popup.js";

//Clase hija de Popup que representa un popup con una imagen
export class PopupWithImage extends Popup {
  //Método público para abrir el popup y mostrar la imagen con su nombre y enlace
  public override open(name?: string, link?: string): void {
    if (name === undefined || link === undefined) {
      throw new Error("La imagen necesita un nombre y un enlace.");
    }
    //Seleccionar los elementos de la imagen y el caption dentro del popup utilizando sus selectores
    const image = this.popupElement.querySelector<HTMLImageElement>(
      ".popup__image",
    );
    const caption = this.popupElement.querySelector<HTMLElement>(
      ".popup__caption",
    );

    //Si no se encuentran los elementos de la imagen o el caption en el DOM, lanzar un error
    if (!image || !caption) {
      throw new Error("No se encontró el marcado de la imagen.");
    }
    
    //Asignar el nombre y el enlace a los atributos alt y src de la imagen, y al contenido de texto del caption
    image.alt = name;
    image.src = link;
    caption.textContent = name;
    //Llamada al método open de la clase base Popup para abrir el popup
    super.open();
  }
}
