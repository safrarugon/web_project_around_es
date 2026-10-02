//Componente Section es el componente encargado de renderizar una sección de elementos en el DOM, utilizando un contenedor y un renderer proporcionados. Este componente es genérico y puede trabajar con cualquier tipo de elemento. 
//importación de tipos necesarios para el funcionamiento del componente Section
import type { SectionConfig } from "../types/types.js";

//Clase Section que representa una sección de elementos en el DOM
export class Section<T> {
  //Propiedades privadas para almacenar los elementos, el renderer y el contenedor de la sección
  private readonly items: T[];
  private readonly renderer: (item: T) => void;
  private readonly container: HTMLElement;

  //constructor que recibe un objeto de configuración con los elementos y el renderer, y un selector para identificar el contenedor en el DOM
  constructor(
    { items, renderer }: SectionConfig<T>,
    containerSelector: string,
  ) {
    //Asignar los elementos y el renderer a las propiedades de la clase
    this.items = items;
    this.renderer = renderer;

    //Seleccionar el contenedor en el DOM utilizando el selector proporcionado
    const container = document.querySelector<HTMLElement>(
      containerSelector,
    );

    //Cuando el contenedor no existe envia mensaje de error
    if (!container) {
      throw new Error(`No se encontró el contenedor: ${containerSelector}`);
    }
    //asigna el valor al container de la clase
    this.container = container;
  }

  //Método público para renderizar los elementos en el contenedor utilizando el renderer proporcionado
  public renderItems(): void {
    //recore el array de items y llama al renderer para cada item, agregando el resultado al contenedor
    this.items.forEach((item) => {
      this.renderer(item);
    });
  }
  //Método público para agregar elementos al contenedor
  public addItem(element: HTMLElement): void {
    this.container.append(element);
  }
}
