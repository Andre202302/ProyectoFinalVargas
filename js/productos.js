/////***query Selector */
const contenedorServicios = document.querySelector('#contenedor-servicios')
const btnToast = document.getElementById('botonToast')
const modalContainer = document.getElementById('modal-container')

///////FETCH//////////////////
let inputTexto = document.getElementById('searchid')
inputTexto.addEventListener('change', () => {
  let buscador = inputTexto.value
  fetch('./data/datos.json')
    .then(response => response.json())
    .then(datos => {
      ///data es el arreglo completo json
  let arrFilter = datos.filter(datos =>
    datos.destino.includes(buscador.toLowerCase())
      )
      mostrarServicios(arrFilter) //arreglo filtrado
    })
})

const mostrarServicios = data => {
  contenedorServicios.innerHTML = '' //para que no se vuelva a renderizar se asigna como un vacio
  data.forEach(servicio => {
    const cardService = document.createElement('div') //contenedor de cada uno de los productos de mi tienda
    cardService.setAttribute('id', 'tarjeta-servicio') //le creo un atributo para estilos
    cardService.innerHTML = `<img class ="ser-img" src="${servicio?.img}" alt="${servicio?.nombre}
                            " style="width: 200px;margin-left: 100px" >
                              <div class ="ser-description" style="display: flex;margin-left: 100px">
                              <h5 class ="detino">Destino:     ${servicio?.destino.toUpperCase()}-</h5><h1>
                              <h5 class ="nombre">${servicio?.nombre}</h5><h1>
                              <h5 class ="peso"> - hasta ${servicio?.peso}-</h5>                                
                              <h5 class ="precio"> su valor es: $${servicio?.precio}</h5>                                
                              <button id='${servicio.id}' class="btn-compra">Comprar</button>
                              </div>
                               `
  contenedorServicios.appendChild(cardService)
  })
  const btnComprar = document.querySelectorAll('.btn-compra') //me trae los elementos del boton con la clase btn-compra
  btnComprar.forEach(el => {
    el.addEventListener('click', e => {
    e.preventDefault() //previene el comportamiento por defecto del evento
    agregarAlCarrito(e.target.id)
    })
  })
}
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

async function fetchApi () {
  const response = await fetch('./data/datos.json')
  const data = await response.json()
  mostrarServicios(data)
}
fetchApi()

////***Gurardar en el Localstore ****////
function guardarLS (elemento) {
  return localStorage.setItem('carrito', JSON.stringify(elemento))
}

function agregarAlCarrito (id) {
  const existe = carrito.some(serv => serv.id === parseInt(id))
     if (existe != true) {
      fetch('./data/datos.json')
      .then(res => res.json())
      .then(data => {
      let servEcontrado = data.find(datos => datos.id === parseInt(id))
      carrito.push(servEcontrado)
      Toastify({
          text: 'Producto agregado correctamente',
          duration: 3000, //milisigundos 1000ms = 1s
          //destination: "https://github.com/apvarun/toastify-js",
          //newWindow: true,
          close: true,
          gravity: 'top', // `top` or `bottom`
          position: 'right', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)'
          },
          onClick: function () {} // Callback after click
        }).showToast()
        guardarLS(carrito)
      })  
    }else{
      Swal.fire('Este producto ya esta agregado')      
  }
}


