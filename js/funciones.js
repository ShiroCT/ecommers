//Operador Logico       
const carro = JSON.parse(localStorage.getItem("myCarro")) || []

function retornoCard({ id, imagen, nombre, precio }) {
    return `<div class="card" id="card${id}">
                    <div class="card-image">${imagen}</div>
                    <div class="card-name">${nombre}</div>
                    <div class="card-price">$ ${precio.toFixed(2)}</div>
                    <div class="card-button">
                        <button class="button button-outline button-add" id="${id}" title="Clic para agregar '${nombre}' al carro"><img src="images/cart-2.png"></button>
                    </div> 
                </div>`
}

function retornoError() {
    return `<div class="card-error">
                    <h1> 🚨PROBLEMA DETECTADO🚨</h1>
                    <h3>No se han podido cargar los datos del FETCh</h3>
                    <h3>Intenta nuevamente más tarde</h3>
                </div>`
}

function retornoTablaCarro(flor) {
    return `<tr>
                    <td class="centrar img-xx-large">${flor.imagen}</td>
                    <td>${flor.nombre}</td>
                    <td>${flor.precio}</td>
                    <td><button class="button button-outline button-delete" id="${flor.nombre}" title="Quitar del carrito">✖</button></td>
                </tr>`
}