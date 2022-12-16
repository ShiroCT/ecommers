//Ver Producto del carro en el boton 
let botonBuy = document.getElementById("botonBuy")
botonBuy.addEventListener("mousemove", () => {
    botonBuy.title = `Volver a la pagina de compras`
})

function recuperarCarro() {
    let tablaHTML = ""
    const tbody = document.querySelector("tbody")
    const carro = JSON.parse(localStorage.getItem("myCarro"))

    if (carro.length >= 0) {
        carro.forEach(flor => tablaHTML += retornoTablaCarro(flor))
        tbody.innerHTML = tablaHTML
        calcularPrecioTotal()
    }
}
recuperarCarro()

function activarBotonesDelete() {
    const buttonsDelete = document.querySelectorAll("button.button-outline.button-delete")
    buttonsDelete.forEach(btn => {
        btn.addEventListener("click", () => {
            let posicion = carro.findIndex(flor => flor.nombre === btn.id)
            if (posicion > -1) {
                carro.splice(posicion, 1)
                localStorage.setItem("myCarro", JSON.stringify(carro))
                recuperarCarro()
                activarBotonesDelete()
            }
        })
    })
}

activarBotonesDelete()

function calcularPrecioTotal() {
    let precio = document.querySelector("h3#total")
    let precioCarro = carro.reduce((acc, flor) => acc + flor.precio, 0)
    precio.innerText = `Total de la Compra: $ ${precioCarro.toLocaleString()}`
    //acc - acomulador

}


//Boton Sweetalert2,com
const btnComprar = document.querySelector("#btnComprar")
btnComprar.addEventListener("click", () => {
    Swal.fire({
        title: '¿Desea confirmar su compra?',
        text: "No sera capas de realizar más cambios despues de esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, terminar Compra!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("myCarro")
            carro.length = 0

            Swal.fire(
                '¡Gracias por su Compra!',
                'no hay devoluciones',
                'success'

            )
                .then(() => {
                    location.href = "index.html" //de nuevo al menu
                })
        }
    })

})