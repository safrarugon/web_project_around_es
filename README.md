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
    
    Formularios
        Para los perfiles y las tarjetas
        Valida los datos de los formularios

Enlaces del proyecto
    Repositorio en GitHub: https://github.com/safrarugon/web_project_around_es.git
    Proyecto publicado: https://safrarugon.github.io/web_project_around_es/

Tecnologías utilizadas
    HTML5 — estructura semántica de la página.
    CSS3 — estilos, distribución y diseño responsivo.
    JavaScript — manipulación del DOM, eventos, formularios y generación dinámica de tarjetas.

Estructura principal
.
├── blocks
│   └── card.css
│   └── cards.css
│   └── content.css
│   └── footer.css
│   └── header.css
│   └── page.css
│   └── popup.css
│   └── profile.css
├── images/
│   └── add-icon.svg
│   └── avatar.jpg
│   └── close.svg
│   └── delete-icon
│   └── edit-icon.svg
│   └── like-active.svg
│   └── like-inactive.svg
│   └── logo.svg
│   └── placeholder.jpg
├── pages/
│   └── index.css
├── scripts/
│   └── index.js
│   └── validate.js
├── vendor/
│   └── fonts/
│       └── fonts.css
│       └── normalize.css
└── .prettierignore
├── index.html
└── README.md


JavaScript
    La lógica principal se encuentra en scripts/index.js.
    La logica de validación de formularios en validate.js

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