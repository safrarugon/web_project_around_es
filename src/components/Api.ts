import type {
  ApiUserData,
  AvatarUpdateData,
  CardData,
  CardFormData,
  ProfileUpdateData,
} from "../types/types.js";

interface ApiOptions {
  baseUrl: string;
  headers: HeadersInit;
}

const NO_CONTENT_STATUS = 204;

export class Api {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;

  constructor({ baseUrl, headers }: ApiOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  private async checkResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    if (response.status === NO_CONTENT_STATUS) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  public async getUserInfo(): Promise<ApiUserData> {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });

    return await this.checkResponse<ApiUserData>(response);
  }

  public async getInitialCards(): Promise<CardData[]> {
    const response = await fetch(`${this.baseUrl}/cards/`, {
      headers: this.headers,
    });

    return await this.checkResponse<CardData[]>(response);
  }

  public async setUserInfo(data: ProfileUpdateData): Promise<ApiUserData> {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });

    return await this.checkResponse<ApiUserData>(response);
  }

  public async addCard(data: CardFormData): Promise<CardData> {
    const response = await fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });

    return await this.checkResponse<CardData>(response);
  }

  public async deleteCard(cardId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });

    await this.checkResponse<unknown>(response);
  }

  public async changeLikeCardStatus(
    cardId: string,
    isLiked: boolean,
  ): Promise<CardData> {
    const method = isLiked ? "PUT" : "DELETE";
    const response = await fetch(
      `${this.baseUrl}/cards/${cardId}/likes`,
      {
        method,
        headers: this.headers,
      },
    );

    return await this.checkResponse<CardData>(response);
  }

  public async setUserAvatar(
    data: AvatarUpdateData,
  ): Promise<ApiUserData> {
    const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });

    return await this.checkResponse<ApiUserData>(response);
  }
}
