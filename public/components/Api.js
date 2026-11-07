const NO_CONTENT_STATUS = 204;
export class Api {
    baseUrl;
    headers;
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    async checkResponse(response) {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        if (response.status === NO_CONTENT_STATUS) {
            return undefined;
        }
        return (await response.json());
    }
    async getUserInfo() {
        const response = await fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        });
        return await this.checkResponse(response);
    }
    async getInitialCards() {
        const response = await fetch(`${this.baseUrl}/cards/`, {
            headers: this.headers,
        });
        return await this.checkResponse(response);
    }
    async setUserInfo(data) {
        const response = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return await this.checkResponse(response);
    }
    async addCard(data) {
        const response = await fetch(`${this.baseUrl}/cards/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return await this.checkResponse(response);
    }
    async deleteCard(cardId) {
        const response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        });
        await this.checkResponse(response);
    }
    async changeLikeCardStatus(cardId, isLiked) {
        const method = isLiked ? "PUT" : "DELETE";
        const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method,
            headers: this.headers,
        });
        return await this.checkResponse(response);
    }
    async setUserAvatar(data) {
        const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return await this.checkResponse(response);
    }
}
//# sourceMappingURL=Api.js.map