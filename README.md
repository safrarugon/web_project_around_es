# Around The U.S.

Proyecto desarrollado como parte del curso de Desarrollo Web de [TripleTen](https://tripleten.com/).

## Descripción

Around The U.S. es una aplicación web para explorar tarjetas de lugares, crear nuevas publicaciones y administrar el perfil del usuario. Los datos de perfil y tarjetas se cargan y guardan en la API de TripleTen sin recargar la página.

El proyecto está desarrollado en TypeScript y aplica programación orientada a objetos, encapsulamiento, herencia, abstracción y bajo acoplamiento.

## Funcionalidades

- Carga del perfil y las tarjetas desde el servidor en paralelo.
- Edición del nombre y la descripción del perfil.
- Cambio de foto de perfil mediante una URL.
- Creación de tarjetas y actualización del estado de “Me gusta” en el servidor.
- Eliminación de tarjetas propias después de confirmar la acción.
- Apertura de imágenes en un popup.
- Validación de formularios y estado de carga “Guardando...”.
- Cierre de ventanas emergentes con el botón, al hacer clic en el overlay o con la tecla `Escape`.

## Tecnologías

- HTML5 y CSS3 adaptable a distintos tamaños de pantalla.
- TypeScript estricto y JavaScript ES2022 compilado.
- Módulos ES, plantillas HTML y manipulación del DOM.
- Fetch API, JSON y métodos HTTP.
- Clases de ES6 y programación orientada a objetos.

## Arquitectura

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Entrada HTML raíz de la aplicación. |
| `pages/index.css` | Importa los estilos organizados en `public/blocks` y `public/vendor`. |
| `src/index.ts` | Entrada TypeScript que carga el punto de entrada de la aplicación. |
| `src/scripts/index.ts` | Construye las dependencias e inicia `App`. |
| `src/components/App.ts` | Coordina carga, renderizado y acciones de la interfaz. |
| `src/components/Api.ts` | Centraliza todas las solicitudes HTTP y comprueba las respuestas. |
| `src/components/Card.ts` | Renderiza una tarjeta y conecta sus acciones mediante callbacks. |
| `src/components/Section.ts` | Renderiza colecciones y añade elementos al contenedor. |
| `src/components/FormValidator.ts` | Valida campos y administra el estado del botón de envío. |
| `src/components/Popup.ts` | Maneja apertura, cierre, overlay y tecla `Escape`. |
| `src/components/PopupWithForm.ts` | Extiende el popup base para formularios y estados de carga. |
| `src/components/PopupWithImage.ts` | Muestra imágenes ampliadas. |
| `src/components/PopupWithConfirmation.ts` | Confirma acciones de eliminación. |
| `src/components/UserInfo.ts` | Actualiza nombre, descripción y avatar en el DOM. |
| `src/types/types.ts` | Define los tipos de formularios y respuestas de la API. |
| `src/utils/constants.ts` | Centraliza la URL de la API y la configuración de validación. |
| `public/` | Contiene recursos estáticos y JavaScript compilado. |

La clase `Api` no conoce los componentes visuales; `App` recibe las dependencias y coordina los callbacks. Los datos que se envían desde formularios tienen tipos distintos de las respuestas completas del servidor.

## Token de autorización

El token no está escrito en el código fuente. Antes de cargar la aplicación, guárdalo en `sessionStorage` desde la consola del navegador en el mismo origen:

```js
sessionStorage.setItem("aroundApiToken", "TU_TOKEN_PERSONAL");
location.reload();
```

No publiques el token ni lo guardes en el repositorio. El navegador necesita el valor para autorizar las llamadas a la API. Para usar otro token, reemplaza el valor de `aroundApiToken` en la sesión actual.

## Compilar y ejecutar

Desde la raíz del repositorio, compila TypeScript:

```bash
npx --yes --package=typescript@5.9.2 tsc
```

Para comprobar los tipos sin generar archivos:

```bash
npx --yes --package=typescript@5.9.2 tsc --noEmit
```

Abre el `index.html` raíz mediante un servidor local como Live Server. La entrada utiliza recursos CSS de `pages/index.css` y JavaScript compilado de `public/`. No abras el archivo con `file://`, porque los módulos ES pueden quedar bloqueados por el navegador. `public/index.html` redirige a la entrada raíz.

## Estructura

```text
.
├── index.html
├── pages/index.css
├── public/
│   ├── blocks/                 # CSS por bloque BEM
│   ├── images/                 # Imágenes e iconos
│   ├── vendor/                 # Normalización y fuentes
│   ├── components/             # JavaScript compilado de clases
│   ├── scripts/index.js        # Lógica compilada de la aplicación
│   ├── index.js                # Entrada JavaScript compilada
│   └── index.html              # Redirección a index.html
├── src/
│   ├── components/             # Clases TypeScript
│   ├── scripts/index.ts
│   ├── index.ts
│   ├── types/types.ts
│   └── utils/constants.ts
├── .gitignore
├── README.md
└── tsconfig.json
```

## Enlaces

- [Repositorio en GitHub](https://github.com/safrarugon/web_project_around_es)
- [Proyecto publicado](https://safrarugon.github.io/web_project_around_es/)

## Autor

Saúl Rubio. Proyecto realizado como parte del curso de Desarrollo Web de TripleTen.
