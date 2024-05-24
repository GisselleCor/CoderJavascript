// Variable de carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


// Función para obtener productos desde un archivo JSON local
const obtenerProductosDesdeJSON = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5500/public/productos.json');
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        console.log('productosJSON')
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

// Función para generar un array de productos aleatorios
const generarProductosAleatorios = async numProductos => {
    try {
        const productos = await obtenerProductosDesdeJSON();
        const productosAleatorios = [];
        const categorias = ['frutas', 'verduras'];

        for (let i = 0; i < numProductos; i++) {
            const categoria = categorias[i % 2];
            const indice = getRandomIndex(0, productos[categoria].length);
            const producto = productos[categoria][indice];
            console.log(producto)
            const precio = (Math.random() * 10 + 1).toFixed(2);
            const stock = Math.floor(Math.random() * 10) + 1;
            const img = 'img/' + producto.toLowerCase() + '.jpg';
            productosAleatorios.push({ categoria, nombre:producto, precio: parseFloat(precio), stock, img });
        }
        return productosAleatorios;
    } catch (error) {
        console.error('Error al generar productos aleatorios:', error);
        return [];
    }
};

// Función para obtener un número aleatorio dentro de un rango dado
const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min) + min);

// Lista de frutas y verduras
//const frutas = ['Manzana', 'Banana', 'Naranja', 'Pera', 'Uva', 'Kiwi', 'Papaya', 'Mango'];
//const verduras = ['Zanahoria', 'Lechuga', 'Papa', 'Tomate', 'Cebolla', 'Espinaca', 'Brócoli', 'Pepino'];

// Función para agregar un producto al carrito de compras
const agregarAlCarrito = index => {
    const producto = productos[index];
    const indice = carrito.findIndex(item => item.nombre === producto.nombre);
    // Se utiliza el operador ternario para incrementar la cantidad si el producto ya está en el carrito
    indice !== -1 ? carrito[indice].cantidad++ : (producto.cantidad = 1, carrito.push(producto));
    actualizarCarritoEnStorage();
    mostrarCarrito();
    calcularTotal();

    // Integración de Sweet Alert dentro de la función agregarAlCarrito
    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: `${producto.nombre} ha sido agregado al carrito.`,
        showConfirmButton: false,
        timer: 1500
    });
};

// Función para mostrar los productos en el HTML
const mostrarProductos = () => {
    const productosContainer = document.getElementById('productos');
    productos.forEach((producto, index) => {
        console.log(producto)
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.img}" alt="${producto.nombre}">
            <p>Categoría: ${producto.categoria}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
            <button onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoElement);
    });
};

// Función para mostrar los productos en el carrito
const mostrarCarrito = () => {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    carrito.forEach(elemento => {
        const elementoCarrito = document.createElement('li');
        elementoCarrito.classList.add('elementoCarrito');
        elementoCarrito.innerHTML = `
            <h3>${elemento.nombre}</h3>
            <p>Categoría: ${elemento.categoria}</p>
            <p>Precio: $${elemento.precio.toFixed(2)}</p>
            <p>Cantidad: ${elemento.cantidad}</p>
        `;
        listaCarrito.appendChild(elementoCarrito);
    });
};

// Función para calcular el total de precio del carrito de compras
const calcularTotal = () => {
    const totalCarrito = document.getElementById('total-carrito');
    // Se utiliza el operador ternario para calcular el total
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalCarrito.textContent = `$${total.toFixed(2)}`;
};

// Función para actualizar el carrito de compras en el almacenamiento local (localStorage)
const actualizarCarritoEnStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Función para buscar un producto por su nombre
const buscarProducto = nombre => {
    return productos.find(producto => producto.nombre === nombre);
};

// Función para consultar el stock de un producto específico
const consultarStock = nombre => {
    const producto = buscarProducto(nombre);
    if (producto) {
        return `Stock disponible para ${producto.nombre}: ${producto.stock}`;
    } else {
        return `Producto "${nombre}" no encontrado`;
    }
};

// Llamar a la función mostrarProductos para mostrar los productos al cargar la página
(async () => {
    productos = await obtenerProductosDesdeJSON();
    mostrarProductos();
    mostrarCarrito();
    calcularTotal();
})();

// Función para mostrar un Sweet Alert de confirmación antes de vaciar el carrito
const confirmarVaciarCarrito = () => {
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: 'Esto vaciará tu carrito de compras',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            Swal.fire(
                '¡Carrito vaciado!',
                'Tu carrito de compras ha sido vaciado correctamente.',
                'success'
            );
        }
    });
};

// Función para vaciar el carrito de compras
const vaciarCarrito = () => {
    carrito = []; // Vaciar el arreglo del carrito
    actualizarCarritoEnStorage(); // Actualizar el almacenamiento local
    mostrarCarrito(); // Mostrar el carrito actualizado (vacío)
    calcularTotal(); // Recalcular el total 
    ; // Recalcular el total (que ahora será $0.00)
};

// Agregar event listener al botón "Vaciar Carrito"
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

// Event listener para el botón de consultar stock
document.getElementById('consultar-stock').addEventListener('click', () => {
    const nombreProducto = document.getElementById('nombre-producto').value;
    const resultadoConsulta = consultarStock(nombreProducto);
    document.getElementById('resultado-consulta').textContent = resultadoConsulta;
});