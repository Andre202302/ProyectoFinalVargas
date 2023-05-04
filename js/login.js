class registros{
  constructor (username,CorreoElectronico,password){
    this.username = username;
    this.CorreoElectronico = CorreoElectronico;
    this.password = password;
  }
  }
/********************querySelectorRegister ****************/
const formIngresar = document.querySelector("#formInput"),
userInput = document.querySelector("#userInput"),
passInput = document.querySelector("#passInput"),
btnInput = document.querySelector("#login"),
mensaje = document.querySelector("#mensaje");

///*****inicializar LS con un usuario**********************************************************************************/
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];//si hay elementos en el LS a esta variable le asigno lo que tengo en LS, si no hay nada va a devolver null
usuarios.push (new registros("Andre","l_andre@gmail.com",123));
////***Gurardar en el Localstore ****////
function guardarLS(elemento){
  return localStorage.setItem('usuarios', JSON.stringify(elemento))
}
guardarLS(usuarios);
//////************************************************************************************************************ */

//funcion para recuperar arreglo del LS y usarlo en el evento
function recuperarLS(){
  return JSON.parse(localStorage.getItem("usuarios"));
}

// asignamos constante de los usuarios recuperados del LS
const registradosLS = recuperarLS();

////****usuarios Registrados**** */
function registrados(registradosLS){
  let userFound = registradosLS.find((usuario)=>{
    return usuario.username == userInput.value && usuario.password == passInput.value;  
  })
    if(userFound){ //el if lo convierte en booleano y se denomina coersion
      window.location.href = "./productos.html";
    }else{
      document.querySelector("#mensaje").innerText = "Datos incorrectos o Usuario No registrado";
    }
  }
  
///***Evento *////
formIngresar.addEventListener('submit', (e)=>{
  e.preventDefault()//previene el comportamiento por defecto del evento
  registrados(registradosLS)
  formIngresar.reset();  
})
