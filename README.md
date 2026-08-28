

index(8).html
Archivo

index.js
JavaScript
Quiero que crees un archivo RAEADME para este proyecto es un proyecto del curso de TripleTen usa HTML, CSS y JS y crea y modifica cards de imágenes y modifica el perfil de quien las carga 

Claro. Preparé el README.md tomando como base el HTML y JavaScript que compartiste, describiendo las funcionalidades reales del proyecto y las tecnologías utilizadas.

Descargar README.md 


README.md
Documento


Agregar los enlaces a mi proyecto en GitHub "https://github.com/safrarugon/web_project_around_es.git" y https://safrarugon.github.io/web_project_around_es/  

Listo. Agregué al README.md una sección de Enlaces del proyecto con:

Repositorio de GitHub

Proyecto publicado en GitHub Pages

Descargar README.md actualizado 


README.md
Documento


Biblioteca
/
Canvas
/
README.md


Around The U.S.
Proyecto desarrollado como parte del curso de Desarrollo Web de TripleTen.

Descripción
Around The U.S. es una página web interactiva en la que el usuario puede visualizar una colección de lugares, crear nuevas tarjetas con imágenes y modificar la información de su perfil.

El proyecto está enfocado en practicar la estructura de una página web con HTML, el diseño responsivo con CSS y la interacción dinámica mediante JavaScript.

Funcionalidades
Perfil
Visualización del nombre del usuario.

Visualización de una descripción o profesión.

Edición del nombre y la descripción mediante un formulario modal.

Actualización de la información del perfil sin recargar la página.

Tarjetas
Carga inicial de una colección de tarjetas con diferentes lugares.

Creación de nuevas tarjetas mediante un formulario.

Las nuevas tarjetas pueden recibir un título y una URL de imagen.

Eliminación de tarjetas.

Función de "Me gusta" para activar o desactivar el estado de una tarjeta.

Visualización ampliada de la imagen y su título mediante un modal.

Modales
El proyecto utiliza ventanas modales para:

Editar el perfil.

Crear una nueva tarjeta.

Visualizar una imagen en tamaño ampliado.

Enlaces del proyecto
Repositorio en GitHub: https://github.com/safrarugon/web_project_around_es.git

Proyecto publicado: https://safrarugon.github.io/web_project_around_es/

Tecnologías utilizadas
HTML5 — estructura semántica de la página.

CSS3 — estilos, distribución y diseño responsivo.

JavaScript — manipulación del DOM, eventos, formularios y generación dinámica de tarjetas.

Estructura principal
.
├── index.html
├── scripts/
│   └── index.js
├── pages/
│   └── index.css
├── images/
│   ├── logo.svg
│   └── avatar.jpg
└── README.md
La estructura anterior representa la organización esperada del proyecto a partir de los archivos utilizados por index.html.

JavaScript
La lógica principal se encuentra en scripts/index.js.

Entre las funciones implementadas se encuentran:

openModal() y closeModal() para controlar la apertura y cierre de ventanas modales.

fillProfileForm() para cargar los datos actuales del perfil en el formulario.

handleProfileFormSubmit() para actualizar la información del perfil.

handleCardFormSubmit() para procesar la creación de nuevas tarjetas.

renderCard() para agregar tarjetas al listado.

getCardElement() para generar cada tarjeta a partir de una plantilla HTML.

Las tarjetas iniciales se almacenan en el arreglo initialCards y se renderizan dinámicamente al cargar la página.

Manipulación del DOM
Uno de los objetivos principales del proyecto es practicar la interacción entre JavaScript y los elementos HTML.

El código utiliza métodos como:

querySelector()

addEventListener()

classList.toggle()

cloneNode()

append()

remove()

Esto permite modificar el contenido y comportamiento de la página directamente desde JavaScript.

Accesibilidad
Se utilizan atributos aria-label en botones que funcionan mediante iconos para proporcionar una descripción de su función, por ejemplo:

Editar perfil.

Agregar tarjeta.

Eliminar tarjeta.

Me gusta.

Cerrar ventanas emergentes.

También se asigna el atributo alt de las imágenes de las tarjetas utilizando el nombre del lugar.

Objetivo académico
Este proyecto forma parte del proceso de aprendizaje del curso de Desarrollo Web de TripleTen y permite poner en práctica conceptos fundamentales del desarrollo frontend:

Estructuración de documentos HTML.

Diseño mediante CSS.

Diseño responsivo.

Manipulación del DOM.

Manejo de eventos.

Formularios.

Uso de plantillas HTML.

Creación dinámica de elementos.

Organización de código JavaScript.

Autor
Saúl Rubio

Proyecto realizado como parte del curso de Desarrollo Web de TripleTen.
