export interface SectionConfig<T> {
  items: T[];
  renderer: (item: T) => void;
}

export interface CardFormData {
  name: string;
  link: string;
}

export interface CardData extends CardFormData {
  _id: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface ApiUserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export interface ProfileUpdateData {
  name: string;
  about: string;
}

export interface AvatarUpdateData {
  avatar: string;
}

export interface UserInfoData {
  name: string;
  description: string;
  avatar: string;
}

export interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
  avatarSelector: string;
}

export interface FormValidatorConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export type PopupWithFormSubmitData = Record<string, string>;

export type SubmitCallback = (
  values: PopupWithFormSubmitData,
) => void | Promise<void>;
