# Around The U.S.

Proyecto desarrollado como parte del curso de Desarrollo Web de [TripleTen](https://tripleten.com/).

## Descripción

Around The U.S. es una página web interactiva en la que el usuario puede explorar una colección de lugares, crear nuevas tarjetas con imágenes y modificar la información de su perfil.

La lógica del proyecto fue refactorizada de JavaScript a **TypeScript** aplicando principios de **programación orientada a objetos**, como encapsulamiento, herencia, polimorfismo, abstracción y bajo acoplamiento entre componentes.

## Funcionalidades

### Perfil

- Visualización del nombre y la descripción del usuario.
- Edición del perfil mediante un formulario modal.
- Actualización de la información sin recargar la página.
- Reinicio de la validación cada vez que se abre el modal.

### Tarjetas

- Renderizado de tarjetas iniciales a partir de un arreglo de datos.
- Creación de nuevas tarjetas mediante un formulario.
- Título y URL de imagen validados mediante HTML y TypeScript.
- Activación y desactivación del estado de Me gusta.
- Eliminación de tarjetas.
- Visualización ampliada de la imagen y su título mediante un modal.

### Ventanas emergentes

El proyecto utiliza ventanas emergentes para:

- Editar el perfil.
- Crear una tarjeta.
- Visualizar una imagen ampliada.
- Cerrar mediante el botón correspondiente, el área sombreada o la tecla `Escape`.

### Validación de formularios

La clase `FormValidator` se encarga de:

- Comprobar la validez de los campos.
- Mostrar los mensajes de error del navegador.
- Aplicar y eliminar las clases visuales de error.
- Activar o desactivar el botón de envío.
- Reiniciar el estado visual del formulario.

## Tecnologías utilizadas

- HTML5.
- CSS3 y diseño responsivo.
- TypeScript con comprobación estricta.
- JavaScript ES2022 generado a partir de TypeScript.
- Manipulación del DOM.
- Módulos ES.
- Programación orientada a objetos.
- Plantillas HTML (`template`).
- Formularios y validación nativa del navegador.

## Arquitectura TypeScript

La aplicación está organizada por responsabilidades:

| Archivo | Responsabilidad |
| --- | --- |
| `src/scripts/index.ts` | Punto de entrada y coordinación de la aplicación. |
| `src/components/Card.ts` | Construcción y comportamiento de una tarjeta. |
| `src/components/Section.ts` | Renderizado de colecciones y agregado de elementos al contenedor. |
| `src/components/FormValidator.ts` | Validación tipada de formularios. |
| `src/components/Popup.ts` | Comportamiento base de las ventanas emergentes. |
| `src/components/PopupWithImage.ts` | Popup especializado para imágenes. |
| `src/components/PopupWithForm.ts` | Popup especializado para formularios. |
| `src/components/UserInfo.ts` | Lectura y actualización de la información del usuario. |
| `src/types/types.ts` | Interfaces y tipos compartidos. |
| `src/utils/constants.ts` | Selectores y clases de configuración de los formularios. |

### Principios de POO aplicados

- **Encapsulamiento:** cada clase administra su propio estado y comportamiento.
- **Abstracción:** los detalles del DOM quedan separados de la coordinación principal.
- **Herencia:** `PopupWithImage` y `PopupWithForm` heredan de `Popup`.
- **Polimorfismo:** las clases hijas sobrescriben métodos como `open()`, `setEventListeners()` y `close()`.
- **Bajo acoplamiento:** `Card` recibe un callback para abrir el popup de imagen sin depender directamente de su implementación.
- **Genéricos:** `Section<T>` puede renderizar colecciones de distintos tipos de datos.

## Estructura del proyecto

```text
.
├── public/                         # Sitio ejecutable y salida compilada
│   ├── index.html                  # Documento HTML principal
│   ├── blocks/                     # Hojas de estilo por bloque BEM
│   ├── images/                     # Imágenes e iconos
│   ├── pages/index.css             # Hoja de estilos principal
│   ├── components/                 # JavaScript compilado de las clases
│   ├── scripts/index.js            # Punto de entrada JavaScript compilado
│   ├── types/                      # Salida compilada de los tipos
│   └── utils/                      # Salida compilada de las constantes
├── src/                            # Código fuente TypeScript
│   ├── components/                 # Clases de la aplicación
│   ├── scripts/index.ts            # Punto de entrada TypeScript
│   ├── types/types.ts              # Tipos e interfaces compartidos
│   └── utils/constants.ts          # Configuración de formularios
├── vendor/                         # Fuentes y estilos normalizados
├── tsconfig.json                   # Configuración del compilador TypeScript
├── .prettierignore
└── README.md
```

Los archivos `.js` de `public/` se generan a partir de `src/` y son los que carga el navegador. El HTML utiliza módulos ES mediante:

```html
<script type="module" src="./scripts/index.js"></script>
```

## Compilación

El proyecto no depende de un `package.json`; se puede utilizar TypeScript mediante `npx`.

Desde la raíz del proyecto, ejecuta:

```bash
npx --yes --package=typescript@5.9.2 tsc
```

El comando:

- Lee los archivos `.ts` incluidos en `src/`.
- Comprueba los tipos usando `strict: true`.
- Genera JavaScript ES2022 en `public/`.
- Genera mapas de código fuente (`.js.map`).

Para comprobar los tipos sin generar archivos:

```bash
npx --yes --package=typescript@5.9.2 tsc --noEmit
```

## Ejecución local

Después de compilar, sirve la carpeta `public/` con un servidor local. Por ejemplo, usando la extensión **Live Server** de Visual Studio Code:

1. Abre la carpeta del proyecto.
2. Ejecuta la compilación de TypeScript.
3. Inicia Live Server sobre `public/index.html`.

Es recomendable utilizar un servidor local porque los módulos ES pueden bloquearse al abrir directamente el archivo mediante `file://`.

## Accesibilidad

- Los botones con iconos incluyen atributos `aria-label`.
- Las imágenes de las tarjetas reciben un texto alternativo basado en su título.
- Los formularios utilizan controles nativos de HTML como `required`, `minlength`, `maxlength` y `type="url"`.
- Los modales se pueden cerrar mediante botón, overlay o la tecla `Escape`.

## Enlaces del proyecto

- [Repositorio en GitHub](https://github.com/safrarugon/web_project_around_es)
- [Proyecto publicado](https://safrarugon.github.io/web_project_around_es/)

## Objetivo académico

Este proyecto permite practicar:

- Estructuración semántica con HTML.
- Diseño responsivo con CSS.
- Manipulación del DOM.
- Manejo de eventos tipados.
- Validación de formularios.
- Plantillas HTML.
- Módulos ES.
- Refactorización de JavaScript a TypeScript.
- Principios de programación orientada a objetos.

## Autor

Saúl Rubio

Proyecto realizado como parte del curso de Desarrollo Web de TripleTen.
