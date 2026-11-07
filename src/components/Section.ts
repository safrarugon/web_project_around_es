import type { SectionConfig } from "../types/types.js";

export class Section<T> {
  private readonly items: T[];
  private readonly renderer: (item: T) => void;
  private readonly container: HTMLElement;

  constructor(
    { items, renderer }: SectionConfig<T>,
    containerSelector: string,
  ) {
    this.items = items;
    this.renderer = renderer;

    const container = document.querySelector<HTMLElement>(
      containerSelector,
    );

    if (!container) {
      throw new Error(`No se encontró el contenedor: ${containerSelector}`);
    }

    this.container = container;
  }

  public renderItems(items: T[] = this.items): void {
    items.forEach((item) => {
      this.renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this.container.append(element);
  }
}
