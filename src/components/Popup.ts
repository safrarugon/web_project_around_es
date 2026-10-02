//--Compnente para los Popups de la aplicación
//Clase base para manejar la apertura y cierre de popups, así como la gestión de eventos relacionados.
export class Popup {
  //Propiedad protegida para almacenar el elemento del popup
  protected readonly popupElement: HTMLElement;

  //Constructor que recibe un selector para identificar el popup en el DOM
  constructor(selector: string) {
    const popup = document.querySelector<HTMLElement>(selector);

    //Si el popup no se encuentra en el DOM, lanzar un error
    if (!popup) {
      throw new Error(`No se encontró el popup: ${selector}`);
    }

    //Asignar el elemento del popup a la propiedad de la clase
    this.popupElement = popup;
  }

  //Método público para abrir el popup, agregando la clase de apertura y registrando el evento de cierre con la tecla Escape
  public open(): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }
  //Método público para cerrar el popup, removiendo la clase de apertura y eliminando el evento de cierre con la tecla Escape
  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }
  //Método privado para manejar el cierre del popup al presionar la tecla Escape
  private handleEscClose = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.close();
    }
  };
  //Método público para establecer los listeners de eventos del popup, incluyendo el cierre al hacer clic en el botón de cierre o fuera del contenido del popup
  public setEventListeners(): void {
    //Seleccionar el botón de cierre dentro del popup
    const closeButton = this.popupElement.querySelector<HTMLButtonElement>(
      ".popup__close",
    );
    //Agregar un listener al botón de cierre para cerrar el popup al hacer clic
    closeButton?.addEventListener("click", () => {
      this.close();
    });

    //Agregar un listener al popup para cerrar al hacer clic fuera del contenido del popup
    this.popupElement.addEventListener("mousedown", (event: MouseEvent) => {
      //Verificar si el clic se realizó en el fondo del popup (fuera del contenido)
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
