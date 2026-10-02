//--Componente para los Popups de los formulario de la aplicación
//importación de tipos y clases necesarias para el funcionamiento del componente PopupWithForm
import type {
  PopupWithFormSubmitData,
  SubmitCallback,
} from "../types/types.js";
import { Popup } from "./Popup.js";

//Clase hija de Popup que representa un popup con un formulario
export class PopupWithForm extends Popup {
  //Propiedades privadas para almacenar la función de callback de envío y el formulario del popup
  private readonly submitCallback: SubmitCallback;
  private readonly form: HTMLFormElement;

  //constructor que recibe un selector para identificar el popup en el DOM y una función de callback para manejar el envío del formulario
  constructor(selector: string, submitCallback: SubmitCallback) {
    //Llamada al constructor de la clase base Popup para inicializar el popup con el selector proporcionado
    super(selector);

    //Seleccionar el formulario dentro del popup utilizando el selector "form"
    const form = this.popupElement.querySelector<HTMLFormElement>("form");

    //Si el formulario no se encuentra en el DOM, lanzar un error
    if (!form) {
      throw new Error("No se encontró el formulario.");
    }

    //Asignar el formulario y la función de callback a las propiedades de la clase
    this.form = form;
    this.submitCallback = submitCallback;
  }

  //Método privado para obtener los valores de los inputs del formulario y devolverlos como un objeto
  private getInputValues(): PopupWithFormSubmitData {
    //Obtiene los inputs del formulario
    const inputs = this.form.querySelectorAll<HTMLInputElement>("input");
    //Inicializa un objeto vacío para almacenar los valores de los inputs
    const values: PopupWithFormSubmitData = {};

    //Para cada input en el formulario, asigna su valor al objeto values utilizando el nombre del input como clave 
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    //Devuelve el objeto con los valores de los inputs
    return values;
  }

  //Método público para establecer los listeners de eventos del popup, incluyendo el cierre al hacer clic en el botón de cierre o fuera del contenido del popup, y el envío del formulario
  public override setEventListeners(): void {
    //Llamada al método setEventListeners de la clase base Popup para establecer los listeners de eventos del popup
    super.setEventListeners();

    //Agregar un listener al formulario para manejar el evento de envío
    this.form.addEventListener("submit", (event: SubmitEvent) => {
      //Prevenir el comportamiento predeterminado del formulario (recargar la página)
      event.preventDefault();
      //Llamar a la función de callback de envío con los valores del formulario
      this.submitCallback(this.getInputValues());
    });
  }

  //Método público para cerrar el popup y resetear el formulario
  public override close(): void {
    super.close();
    this.form.reset();
  }
}
