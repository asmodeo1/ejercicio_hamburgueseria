
const colorSeleccionado = "rgb(157, 239, 186)";
let total = 0;

function seleccionar(e) {
    const producto = e.currentTarget;
    // Si estaba ya añadido
    if(producto.style.backgroundColor == colorSeleccionado) {
        producto.style.backgroundColor = "transparent";

        const elegidos = document.getElementById("elegidos").getElementsByTagName("li");
        for (const elegido of elegidos) {
            if(elegido.dataset.nombre == producto.getElementsByClassName("nombre")[0].textContent) {
                elegido.remove();
                total -= parseInt(producto.dataset.precio);
                break;
            }
        }
    } else {
        // No estaba añadido
        producto.style.backgroundColor = colorSeleccionado;
        const nombre = producto.getElementsByClassName("nombre")[0];
        const nuevoLi = document.createElement("li");
        // Le añado un dataset para que peuda buscarlo al eliminarlo. Otra opción sería tener el dataset
        // con el nombre ya en HTML como si tenemos hecho con el precio.
        nuevoLi.dataset.nombre = nombre.textContent;
        nuevoLi.innerHTML = "<span>" + nombre.textContent + "</span><span>" + producto.dataset.precio + "€</span>";
        document.getElementById("elegidos").appendChild(nuevoLi);
        total += parseInt(producto.dataset.precio);
    }
    document.getElementById("total").textContent = total + "€";
}

function vaciar() {
    const elegidos = document.getElementById("elegidos");
    elegidos.textContent = "";
    total = 0;
    document.getElementById("total").textContent = total + "€";
    // Quitamos el color de fondo de todos los productos por si hubiese alguno seleccionado
    const productos = document.getElementsByClassName("producto");
    for (const producto of productos) {
        producto.style.backgroundColor = "transparent";
    }
}

const productos = document.getElementsByClassName("producto");
for (const producto of productos) {
    producto.addEventListener("click", seleccionar);
}

document.getElementById("vaciar").addEventListener("click", vaciar);