
  window.addEventListener('load', ()=> {

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    



  

           const url = `https://api.openweathermap.org/data/2.5/weather?q=Argentina&lang=es&units=metric&appid=${'2523344182137c2b49ba04ba27348f17'}`


           fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent = `${temp} ° C`

                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()                
                
            })
            .catch( error => {
                console.log(error)
            })
       })
          
    




//DIV DE APUESTAS

const contenedorApuesta = document.getElementById('contenedorApuesta')

const contenedorTotal = document.querySelector('#carrito-contenedor')

const monto = document.querySelector('#validacion__monto')

let saldo = 0



//MODAL

const botonEnviarCarrito = document.querySelector('#enviarAlCarrito')

const modalContenedor = document.querySelector('#modal-contenedor')

const botonCerrar = document.querySelector('#carritoCerrar')

const vaciarCarrito = document.querySelector('#vaciar-carrito')


//CONTADOR CARRITO

const contadorApuesta = document.querySelector('#contadorDeApuestas')

const contadorTotal = document.querySelector('#precioTotal')

 //MAQUIAN COME MONEDAS

 //MODAL

 const cerrarModal = document.querySelector('#numeros__cerrarModal')  
 const modalContainer = document.querySelector('#message')
 
 const cerrarModalDos = document.querySelector('#saldo__cerrarModal')  
 const modalContainerDos = document.querySelector('#messageDos')
 
 //DEPOSITO
 
 const form = document.querySelector('#form-deposito')
 let inputDeposito = document.querySelector('#deposito')
 // let saldo = 0
 
 
 const btnDeposito = document.querySelector('#btn-Deposito')
 
 //NUMEROS RANDOM
 
 const item1 = document.querySelector('#item1')
 const item2 = document.querySelector('#item2')
 const item3 = document.querySelector('#item3')
 let num1 = 0
 let num2= 0
 let num3 = 0
 const btnStar = document.querySelector('#btnStart')



let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarApuesta()
    }
})


vaciarCarrito.addEventListener('click', ()  =>{
    carrito.length = 0
    actualizarApuesta()
})

apuestas.forEach((apuesta) => {
    const div = document.createElement('div')
    div.classList.add('apuesta')
    div.innerHTML = `
    <h3 class="apuesta__titulo">${apuesta.tipo}</h3>
    <p class="apuesta__parrafo">$${apuesta.monto}</p>
    <button id="agregar${apuesta.id}" class="boton-agregar">Agregar</button>
    `
    contenedorApuesta.appendChild(div)

    const boton = document.getElementById(`agregar${apuesta.id}`)

    boton.addEventListener('click', () => {
        agregarCarrito(apuesta.id)
    })


})

const agregarCarrito = (apueId) =>{

    const juntar = carrito.some (apue => apue.id === apueId)

    if (juntar){
        const apue = carrito.map (apue => {
            if(apue.id === apueId){
                apue.cantidad++
            }
        })
    } else{

    const item = apuestas.find((apue) => apue.id === apueId)
    carrito.push(item)
}
actualizarApuesta()
}

const eliminarDelTotal = (apueId) => {

    const item = carrito.find((apue) => apue.id === apueId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarApuesta()
}

const actualizarApuesta = () => {

    contenedorTotal.innerHTML = ""

    carrito.forEach((apue) => {
    const div = document.createElement('div')
    div.className = ('apuestaEnCarrito')
    div.innerHTML = `
    <p class="textoModal"> ${apue.tipo}</p>
    <p class="textoModal"> Monto: ${apue.monto}</p>
    <p class="textoModal"> Cantidad: <span id="cantidad">${apue.cantidad}</span></p>
    <button onclick="eliminarDelTotal(${apue.id})" class="boton-eliminar">X</button>
    `
    contenedorTotal.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorApuesta.innerText = carrito.length
    contadorTotal.innerText = carrito.reduce((acc,apue) => acc + apue.cantidad * apue.monto, 0 )
    monto.innerText = carrito.reduce((acc,apue) => acc + apue.cantidad * apue.monto, 0 )
    
}

botonEnviarCarrito.addEventListener('click', () => {
   modalContenedor.classList.add('active')
})

botonCerrar.addEventListener('click', () => {
    modalContenedor.classList.remove('active')
 })


function restar(){
    saldo = monto.textContent - 10;
    console.log(saldo)
    monto.innerText = saldo
    if(saldo <= 100){
        monto.classList.add("peligro");
    }else{
        monto.classList.remove("peligro");
    }
}

function sumar(){
    saldo = saldo + 40;
    console.log(saldo)
    monto.innerText = saldo
    
}



function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function ramdomNumber(){
    num1 = getRandomNumber(0,4);
    num2 = getRandomNumber(0,4);
    num3 = getRandomNumber(0,4);
}


function mostrasrNumemeros(){
    item1.innerHTML = num1;
    item2.innerHTML = num2;
    item3.innerHTML = num3;
}




function azar(){
    if (num1 === num2 && num1 === num3) {
        sumar();
        } else {
        restar();
    }
    if(saldo <= 0){
        mostrarMensajeDos()
    }else{
        ocultarMensajeDos()
    }
}



function arranque(){
    getRandomNumber();
    ramdomNumber();
    mostrasrNumemeros();
    azar();
}



btnStar.addEventListener('click', () => {
    arranque()
    if (num1 === num2 && num1 === num3) {
                        mostrarMensaje();
                        } else {
                        ocultarMensaje();
                    }


})

        function mostrarMensaje() {
            const msg = document.querySelector("#message");
            msg.classList.add("numeros__modalCajaActivado")
        }

        function ocultarMensaje() {
            const msg = document.querySelector("#message");
            msg.classList.remove("numeros__modalCajaActivado")
        }

cerrarModal.addEventListener('click', () => {
     modalContainer.classList.remove('numeros__modalCajaActivado')
})

        function mostrarMensajeDos(){
            const sins= document.querySelector("#messageDos");
            sins.classList.add("saldo__modalCajaActivado")

        }

        function ocultarMensajeDos(){
            const sins= document.querySelector("#messageDos");
            sins.classList.add("numeros__modalCajaActivado")

        }

        
cerrarModalDos.addEventListener('click', () => {
    modalContainerDos.classList.remove('saldo__modalCajaActivado')
})
