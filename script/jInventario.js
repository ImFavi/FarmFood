// Simulación de inventario (debe venir del archivo JSON en producción)
let inventario = [
    { id: 1, producto: "Producto A", cantidad: 50, precio: 12.5, image: 'images/imageNotFound.jpg' },
    { id: 2, producto: "Producto B", cantidad: 30, precio: 8.75, image: 'images/imageNotFound.jpg' },
    { id: 3, producto: "Producto C", cantidad: 70, precio: 15.0, image: 'images/imageNotFound.jpg' }
];

// Cargar inventario desde el archivo JSON (Simulación)
async function cargarInventario() {
    try {
        // Aquí puedes usar fetch para cargar el archivo JSON real
        // const response = await fetch('data/inventario.json');
        // inventario = await response.json();
        mostrarInventario(inventario);
    } catch (error) {
        console.error('Error al cargar el inventario:', error);
    }
}

// Mostrar inventario en cards
function mostrarInventario(inventario) {
    const inventoryContainer = document.getElementById('inventoryContainer');
    inventoryContainer.innerHTML = ''; // Limpiar el contenedor

    inventario.forEach((producto) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card shadow-sm">
                <img src="${producto.image}" class="card-img-top" alt="${producto.producto}" />
                <div class="card-body">
                    <h5 class="card-title">${producto.producto}</h5>
                    <p class="card-text">Cantidad: ${producto.cantidad}</p>
                    <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                    <button class="btn btn-secondary btn-sm" onclick="editarProducto(${producto.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            </div>
        `;
        inventoryContainer.appendChild(card);
    });
}

// Función para agregar un producto desde formulario
document.getElementById('addProductBtn').addEventListener('click', () => {
    const form = document.getElementById('addProductForm');
    form.style.display = 'block';  // Mostrar el formulario
});

// Cancelar la acción de agregar producto
document.getElementById('cancelProductBtn').addEventListener('click', () => {
    const form = document.getElementById('addProductForm');
    form.style.display = 'none';  // Ocultar el formulario
});

// Guardar el nuevo producto
document.getElementById('saveProductBtn').addEventListener('click', () => {
    const id = document.getElementById('productId').value;
    const nombre = document.getElementById('productName').value;
    const cantidad = document.getElementById('productQuantity').value;
    const precio = document.getElementById('productPrice').value;

    if (id && nombre && cantidad && precio) {
        const nuevoProducto = {
            id: parseInt(id),
            producto: nombre,
            cantidad: parseInt(cantidad),
            precio: parseFloat(precio),
            image: 'images/imageNotFound.jpg'  // Ruta de imagen por defecto
        };

        // Agregar el producto al inventario
        inventario.push(nuevoProducto);
        mostrarInventario(inventario);  // Actualizar la vista
        const form = document.getElementById('addProductForm');
        form.style.display = 'none';  // Ocultar el formulario
    } else {
        alert('Por favor complete todos los campos correctamente.');
    }
});

// Función para editar un producto
function editarProducto(id) {
    const producto = inventario.find(p => p.id === id);
    if (producto) {
        const nuevoNombre = prompt('Nuevo nombre:', producto.producto);
        const nuevaCantidad = prompt('Nueva cantidad:', producto.cantidad);
        const nuevoPrecio = prompt('Nuevo precio:', producto.precio);

        // Actualizar el producto con los nuevos valores si se ingresaron
        if (nuevoNombre) producto.producto = nuevoNombre;
        if (nuevaCantidad) producto.cantidad = parseInt(nuevaCantidad);
        if (nuevoPrecio) producto.precio = parseFloat(nuevoPrecio);

        mostrarInventario(inventario);  // Actualizar la vista
    }
}

// Función para eliminar un producto
function eliminarProducto(id) {
    const index = inventario.findIndex(p => p.id === id);
    if (index !== -1) {
        inventario.splice(index, 1);  // Eliminar producto del inventario
        mostrarInventario(inventario);  // Actualizar la vista
    }
}

// Cargar inventario al inicio
cargarInventario();
