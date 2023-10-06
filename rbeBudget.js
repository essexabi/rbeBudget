// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'competencia',
        precioMoonshot: 26,
        precioFast2: 26,
        imagen: 'imgs/Bodegon-alarmas-transparente.png',

        
    },
    {
        id: 2,
        nombre: 'sin competencia',
        precioMoonshot: 32,
        precioFast2: 32,
        imagen: 'imgs/Bodegon-alarmas-transparente.png'
        
    },
    {
        id: 3,
        nombre: 'shocksensor',
        precioMoonshot: 1.24,
        precioFast2: 1.00,
        imagen: 'imgs/shocksensor.PNG'
    },
    {
        id: 4,
        nombre: 'fotodetector',
        precioMoonshot: 2.48,
        precioFast2: 2.00,
        imagen: 'imgs/fotodetector.PNG'
    },
    {
        id:5,
        nombre: '1ª arlo',
        precioMoonshot: 2.00,
        precioFast2: 2.00,
        imagen: 'imgs/arlo.jpg'
    },
    {
        id:6,
        nombre: 'arlo',
        precioMooshot: 3.30,
        precioFast2: 3.30,
        imagen: 'imgs/arlo.jpg'
    },
    {
        id: 7,
        nombre: 'sdi',
        precioMoonshot: 2.00,
        precioFast2: 2.00,
        imagen: 'imgs/sdi.PNG'
    }

];

let carrito = [];
const divisa = '€';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotalMoonshot = document.querySelector('#totalMoonshot');
const DOMtotalMoonshotConIVA = document.querySelector('#totalMoonshotConIVA');
const DOMtotalMoonshotConIGIC = document.querySelector('#totalMoonshotConIgic');
const DOMtotalFast2 = document.querySelector('#totalFast2');
const DOMtotalFast2ConIVA = document.querySelector('#totalFast2ConIVA');
const DOMtotalFast2ConIGIC = document.querySelector('#totalFast2ConIgic');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-6', 'col-md-12', 'bg-secondary', 'rounded-0', 'mt-1');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body', 'text-center');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title', 'text-center', 'text-white');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-thumbnail');
        miNodoImagen.setAttribute('src', info.imagen);
        miNodoImagen.style.maxHeight = '200px';
        // Precio
        const miNodoPrecio = document.createElement('h6');
        
        // Boton 
        const miNodoBoton = 
        document.createElement('div');

        document.createElement('button');
        miNodoBoton.classList.add('div', 'd-grid', 'gap-2');
        miNodoBoton.classList.add('btn', 'btn-danger', 'btn-lg');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-left');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el Moonshot total en el HTML
    DOMtotalMoonshot.textContent = calcularTotal();
    DOMtotalMoonshotConIVA.textContent = calcularTotalConIVA();
    DOMtotalMoonshotConIGIC.textContent = calcularTotalConIGIC();
    DOMtotalFast2.textContent = calcularTotalF2();
    DOMtotalFast2ConIVA.textContent = calcularTotalF2ConIVA();
    DOMtotalFast2ConIGIC.textContent = calcularTotalF2ConIGIC();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el Moonshot total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su Moonshot
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precioMoonshot;
    }, 0).toFixed(2);
}

function calcularTotalConIVA() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su Moonshot
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        const totalMasIVA= total + miItem[0].precioMoonshot + miItem[0].precioMoonshot*21/100;
        return totalMasIVA ;
    }, 0).toFixed(2);
}

function calcularTotalConIGIC() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su Moonshot
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        const totalMasIGIC= total + miItem[0].precioMoonshot + miItem[0].precioMoonshot*7/100;
        return totalMasIGIC ;
    }, 0).toFixed(2);
}

function calcularTotalF2() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su Moonshot
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precioFast2;
    }, 0).toFixed(2);
}

function calcularTotalF2ConIVA() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su Moonshot
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        const totalMasIVA= total + miItem[0].precioFast2 + miItem[0].precioFast2*21/100;
        return totalMasIVA ;
    }, 0).toFixed(2);
}

function calcularTotalF2ConIGIC() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su Moonshot
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        const totalMasIGIC= total + miItem[0].precioFast2 + miItem[0].precioFast2*7/100;
        return totalMasIGIC ;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();

