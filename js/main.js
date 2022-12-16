const titulo = document.getElementById("titulo")
const slogan = document.getElementById("slogan")
const footer = document.getElementById("footer")
const container = document.getElementById("container")
const inputSearch = document.querySelector("input#inputSearch")

const imgBasket = document.getElementById("imgBasket")

const URL = 'basedata/productos.json'
const productos = []

// Hosting para gifhub.io
// Consultar en consola "hosting.includes(github.oi)" captuar la URL con esta linea
const hosting = location.href
if(hosting.includes("github.io")){

}else{
    // cargar la funcion asincronica
}

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
/*
// Paticion Promesas
fetch(URL) //PIDO LOS DATOS AL SERVIDOR, O ARCHIVO .JSON
    .then((response)=> data = response.json()) //RECIBO LOS DATOS EN FORMATO TEXTO, Y LOS CONVIERTO EN ARRAY
    .then((data) => productos.push(...data)) //INCORPORO EL ARRAY A MI ARRAY DE OBJETOS ORIGINAL
    .then(() => cargarProductos(productos)) //CARGO LOS PRODUCTOS O ARRAY EN PANTALLA
    .then(()=> activarClickBotones()) //ACTIVO EL CLICK EN LOS BOTONES
    .catch(error => container.innerHTML = retornoError()) //CONTROLO CUALQUIER POSIBLE ERROR.
*/


//Titulo y Texto generado
titulo.innerText = "La Floreria de Moe";
slogan.textContent = "💐Arme su pedido de flores siguiendo nuestra trabla de codigos💐"
footer.innerHTML = "<p>🙎‍♂️ Estudiante: Christian Tulian</p><p>💻Comisión 34095 - Curso JavaScript</p>" 

//

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

function filtrarProductos() { //Aplicamos operador ternario
    let resultado = productos.filter(producto => producto.nombre.toUpperCase().includes(inputSearch.value.toUpperCase().trim()))
        if (resultado.length > 0) {
            cargarProductos(resultado)
            activarClickBotones()
        } else {
            console.warn("No se han encontrado coincidencias.")
        }
}

inputSearch.addEventListener("search", ()=> { //Aplicamos operador ternario
    inputSearch.value.trim() !== "" ? filtrarProductos() : cargarProductos(productos)
})

//Ventanitas verdes---Toastify JS
/*const toast = (text, bgcolor)=> {
    Toastify({
        text: text,
        duration: 2500,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: { background: bgcolor || 'CornFlowerBlue', fontSize: '24px'}
      }).showToast();
}*/



//Producto en carro 
imgBasket.src = "images/basket.png"

imgBasket.addEventListener("mousemove", ()=> {
    let totalProductos = carro.length
        imgBasket.title = `${totalProductos} productos en el carrito`
})


