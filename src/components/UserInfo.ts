//--Componente UserInfo es el componente encargado de manejar la información del usuario en el DOM, permitiendo obtener y establecer los datos del usuario en los elementos correspondientes.
//importación de tipos necesarios para el funcionamiento del componente UserInfo
import type {
  UserInfoData,
  UserInfoSelectors,
} from "../types/types.js";

//Clase UserInfo que representa la información del usuario en el DOM
export class UserInfo {
  //Propiedades privadas para almacenar los elementos del nombre y la descripción del usuario
  private readonly nameElement: HTMLElement;
  private readonly descriptionElement: HTMLElement;

  //constructor que recibe un objeto de selectores para identificar los elementos del nombre y la descripción en el DOM
  constructor(selectors: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(
      selectors.nameSelector,
    );
    const descriptionElement = document.querySelector<HTMLElement>(
      selectors.descriptionSelector,
    );

    //Cuando los elementos no existen envia mensaje de error
    if (!nameElement || !descriptionElement) {
      throw new Error("No se encontraron los elementos del usuario.");
    }

    //Asigna los valores a las propiedades de la clase
    this.nameElement = nameElement;
    this.descriptionElement = descriptionElement;
  }

  //Método público para obtener la información del usuario desde los elementos del DOM
  public getUserInfo(): UserInfoData {
    //Retorna un objeto con el nombre y la descripción del usuario, utilizando el contenido de texto de los elementos correspondientes
    return {
      name: this.nameElement.textContent ?? "",
      description: this.descriptionElement.textContent ?? "",
    };
  }

  //Método público para establecer la información del usuario en los elementos del DOM
  public setUserInfo(data: UserInfoData): void {
    //Asigna los valores del nombre y la descripción del usuario a los elementos correspondientes en el DOM
    this.nameElement.textContent = data.name;
    this.descriptionElement.textContent = data.description;
  }
}
