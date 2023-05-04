/********************querySelectorRegister ****************/
const formRegister = document.querySelector("#formRegister"),
      userReg = document.querySelector("#userReg"),
      emailReg = document.querySelector("#emailReg"),
      passReg = document.querySelector("#passReg"),
      btnReg = document.querySelector("#registrar");
      
////////////////*******Registro de Usuarios******///////////////////////////
class registros{
constructor (username,CorreoElectronico,password){
  this.username = username;
  this.CorreoElectronico = CorreoElectronico;
  this.password = password;
}
}
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];//si hay elementos en el LS a esta variable le asigno lo que tengo en LS, si no hay nada va a devolver null


///***funcion guardar usuario nuevo**** */
function agregarUser(registros){
  return usuarios.push(registros)
}
////***Gurardar en el Localstore ****////
function guardarLS(elemento){
  return localStorage.setItem('usuarios', JSON.stringify(elemento))
}
guardarLS(usuarios);

localStorage.clear();

///***Evento****////
formRegister.addEventListener('submit', (e)=>{
  e.preventDefault()//previene el comportamiento por defecto del evento
  const newUser= new registros(
    userReg.value,
    emailReg.value,
    passReg.value
  )  
  agregarUser(newUser)
  guardarLS(usuarios)
  const titulo=document.getElementById('titulo');
  titulo.innerText="USUARIO REGISTRADO-Ingresa por el link de Iniciar Sesión";
  formRegister.reset();  
})
localStorage.clear();




