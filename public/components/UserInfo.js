//Clase UserInfo que representa la información del usuario en el DOM
export class UserInfo {
    //Propiedades privadas para almacenar los elementos del nombre y la descripción del usuario
    nameElement;
    descriptionElement;
    avatarElement;
    //constructor que recibe un objeto de selectores para identificar los elementos del nombre y la descripción en el DOM
    constructor(selectors) {
        const nameElement = document.querySelector(selectors.nameSelector);
        const descriptionElement = document.querySelector(selectors.descriptionSelector);
        const avatarElement = document.querySelector(selectors.avatarSelector);
        //Cuando los elementos no existen envia mensaje de error
        if (!nameElement || !descriptionElement || !avatarElement) {
            throw new Error("No se encontraron los elementos del usuario.");
        }
        //Asigna los valores a las propiedades de la clase
        this.nameElement = nameElement;
        this.descriptionElement = descriptionElement;
        this.avatarElement = avatarElement;
    }
    //Método público para obtener la información del usuario desde los elementos del DOM
    getUserInfo() {
        //Retorna un objeto con el nombre y la descripción del usuario, utilizando el contenido de texto de los elementos correspondientes
        return {
            name: this.nameElement.textContent ?? "",
            description: this.descriptionElement.textContent ?? "",
            avatar: this.avatarElement.src ?? "",
        };
    }
    //Método público para establecer la información del usuario en los elementos del DOM
    setUserInfo(data) {
        //Asigna los valores del nombre y la descripción del usuario a los elementos correspondientes en el DOM
        this.nameElement.textContent = data.name;
        this.descriptionElement.textContent = data.description;
        this.avatarElement.src = data.avatar;
    }
}
//# sourceMappingURL=UserInfo.js.map