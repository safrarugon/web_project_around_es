const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector("#edit-popup");
const profileEditCloseBtn = profileEditPopup.querySelector(".popup__close");
const profileEditForm = profileEditPopup.querySelector("#edit-profile-form");
const profileEditTitle = profileEditForm.querySelector(
  ".popup__input_type_name",
);
const profileEditDescription = profileEditForm.querySelector(
  ".popup__input_type_description",
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
function fillProfileForm() {
  profileEditTitle.setAttribute("value", profileTitle.textContent);
  profileEditDescription.setAttribute("value", profileDescription.textContent);
}
function handleOpenEditModal() {
  openModal(profileEditPopup);
  fillProfileForm();
}
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileEditTitle.value;
  profileDescription.textContent = profileEditDescription.value;
}

profileEditBtn.addEventListener("click", () => {
  handleOpenEditModal();
});

profileEditCloseBtn.addEventListener("click", () => {
  closeModal(profileEditPopup);
});
profileEditForm.addEventListener("submit", () => {
  handleProfileFormSubmit(event);
  closeModal(profileEditPopup);
});

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
initialCards.forEach((card) => {
  console.log(card.name, card.link);
});
