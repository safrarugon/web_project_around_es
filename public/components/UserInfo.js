export class UserInfo {
    nameElement;
    descriptionElement;
    constructor(selectors) {
        const nameElement = document.querySelector(selectors.nameSelector);
        const descriptionElement = document.querySelector(selectors.descriptionSelector);
        if (!nameElement || !descriptionElement) {
            throw new Error("No se encontraron los elementos del usuario.");
        }
        this.nameElement = nameElement;
        this.descriptionElement = descriptionElement;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            description: this.descriptionElement.textContent ?? "",
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.descriptionElement.textContent = data.description;
    }
}
//# sourceMappingURL=UserInfo.js.map