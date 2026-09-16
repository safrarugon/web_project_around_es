//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Funciones de validación de formularios y mensajes de error------------------------------
//Funcion para mostrar el mensaje de error en el input correspondiente-----------------------------------
function showInputError(form, input) {
  //Obtiene el elemento de error correspondiente al input------------------------------------------------
  const errorElement = form.querySelector(`.${input.name}-error`);
  //Validación del input y muestra el mensaje de error si no es válido-----------------------------------
  if (!input.validity.valid) {
    //Muestra el mensaje de error en el elemento correspondiente-----------------------------------------
    errorElement.textContent = input.validationMessage;
  } else {
    //Si el input es válido, limpia el mensaje de error--------------------------------------------------
    errorElement.textContent = "";
  }
}
//Función para verificar la validez del formulario y habilitar/deshabilitar el botón de envío------------
function checkFormValidity(form, submitButton) {
  //Obtiene todos los inputs del formulario--------------------------------------------------------------
  const inputs = form.querySelectorAll(".popup__input");
  //Itera sobre cada input y muestra el mensaje de error correspondiente---------------------------------
  inputs.forEach((input) => {
    //Llama a la función para mostrar el mensaje de error------------------------------------------------
    showInputError(form, input);
  });
  //Habilita o deshabilita el botón de envío según la validez del formulario-----------------------------
  submitButton.disabled = !form.checkValidity();
}
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//---------------Exportación de funciones para validación de formularios---------------------------------
export { checkFormValidity };
