//Variables constantes y globales que nos ayudarán con algunos datos redundantes de la aplicación

// Listado de países que se rellenaran en el select del formulario de inscripción del usuario
export const Countries = ["Spain", "France", "Germany", "Italy", "Portugal", "USA", "Latin America"];

// Datos para poder identificar el sexo/género de cada ubno de nuestros usuarios
export const TypeSexList = ["Male", "Female", "I prefer not to say it"];

// Categorías/Tipo de tareas que el solicitante, o su tutor pueden rellenar, para así, poder filtrarlas el voluntario
// a la hora de buscar alguna
export const TaskCategories = ["cares", "buyout", "company", "children", "homework", "animals", "job"];


//Cosntante que dice que el usuario es de tipo vountary/voluntario
export const userTypeVoluntary = "voluntary"

//Cosntante que dice que el usuario es de tipo petitioner/solicitante
export const userTypePetitioner = "petitioner"

/*Estas variables nos serviran para editar los diferentes formularios,
que serán la misma página donde insertamos los datos de registro,
pero con algunas opciones diferentes; dependiendo de cuál sea la opción se incluirá algún campo
o cambiará el formulario*/
export const modeRegisterForm = "register";
export const modeUpdateForm = "update";

export const registrationVar = "Registration";
export const updateVar = "Update";

/*Variables globales que se usarán para definir el estado de las tareas*/
export const taskUnassigned = `Unassigned`;
export const taskInProgress = `In Progress`;
export const taskDone = `Done`;

// Enum para el componente loading
export enum LoadingState {
  LOADING = 'loading',
  ERROR = 'error',
  LOADED = 'loaded'
}

// API Access Key PositionStack
export const positionStackKey = `8d8be8e360410fb8ba504071bb8a712e`;
