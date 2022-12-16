const container = document.getElementById("container")
const inputSearch = document.querySelector("input#inputSearch")

const URL = 'basedata/productos.json'
const productos = []

//Peticion Asyncronica
async function cargarDatos() {
    try {
        const response = await fetch(URL)
        const data = await response.json()
            if ( data.length > 0) {
                productos.push(...data)
                cargarProductos(productos)
                activarClickBotones()
            }
    } catch (error) {
        console.error(error)
        container.innerHTML = retornoError()
    }
}
cargarDatos()

function cargarProductos(array) {
    let contenido = ""
        if (array.length > 0) {
            array.forEach(producto => {
                contenido += retornoCard(producto)
            })
            container.innerHTML = contenido
        }
}


function toast(text){
    Toastify({
        text: text,
        duration: 3000,
        destination: "checkout.html",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    
}

function activarClickBotones() {
    const botonesAdd = document.querySelectorAll("button.button.button-outline.button-add")
    botonesAdd.forEach(btn => {
        btn.addEventListener("click", ()=> {
            let resultado = productos.find(prod => prod.id === parseInt(btn.id))
            console.log(resultado)
                carro.push(resultado)
                localStorage.setItem("myCarro", JSON.stringify(carro))
                toast(`'${resultado.nombre}' se agregó al carrito`, 'green')
        })
    })
}
//Aplicamos operador ternario
function filtrarProductos() { 
    let resultado = productos.filter(producto => producto.nombre.toUpperCase().includes(inputSearch.value.toUpperCase().trim()))
        if (resultado.length > 0) {
            cargarProductos(resultado)
            activarClickBotones()
        } else {
            console.warn("No se han encontrado coincidencias.")
        }
}
//Aplicamos operador ternario
inputSearch.addEventListener("search", ()=> { 
    inputSearch.value.trim() !== "" ? filtrarProductos() : cargarProductos(productos)
})

//Ver Producto del carro en el boton 
let botonBasket = document.getElementById("botonBasket")
botonBasket.addEventListener("mousemove", ()=> {
    let totalProductos = carro.length
        botonBasket.title = `${totalProductos} productos en el carrito`
})





