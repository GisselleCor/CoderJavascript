// Función para obtener un número aleatorio dentro de un rango dado
function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
    // Lista de frutas y verduras
    var frutas = ['Manzana', 'Banana', 'Naranja', 'Pera', 'Uva', 'Kiwi', 'Papaya', 'Mango'];
    var verduras = ['Zanahoria', 'Lechuga', 'Papa', 'Tomate', 'Cebolla', 'Espinaca', 'Brócoli', 'Pepino'];


   // Array de carrito de compras
    var carrito = [];

  // Función para generar un array de productos sin repetir frutas o verduras
    function generarProductos(numProductos) {
    var productos = [];
    var categorias = ['fruta', 'verdura'];
  
    for (var i = 0; i < numProductos; i++) {
      var categoria = categorias[i % 2]; // Alternar entre fruta y verdura
      var nombre;
      var precio;
  
      // Seleccionar nombre de forma aleatoria de la lista correspondiente
      if (categoria === 'fruta') {
        nombre = frutas.splice(getRandomIndex(0, frutas.length), 1)[0];
      } else {
        nombre = verduras.splice(getRandomIndex(0, verduras.length), 1)[0];
      }
  
      // Generar un precio aleatorio entre 1 y 10
      precio = (Math.random() * 10 + 1).toFixed(2);
  
      // Crear objeto producto y añadirlo al array
      var producto = {
        categoria: categoria,
        nombre: nombre,
        precio: parseFloat(precio)
      };
  
      productos.push(producto);
    }
  
    return productos;
}

  // Función para agregar un producto al carrito de compras
    function agregarAlCarrito(index) {
    
    var producto = productos[index];
    var indice = carrito.findIndex(item => item.nombre === producto.nombre);
    if (indice !== -1) {
        carrito[indice].cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    mostrarCarrito()
    calcularTotal() 
}


  // Función para mostrar los productos en el HTML
    function mostrarProductos() {
    var productosHTML = '';

    productos.forEach(function(producto, index) {
        productosHTML += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <p>Categoría: ${producto.categoria}</p>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
            </div>
        `;
    });

    document.getElementById('productos').innerHTML = productosHTML;
}

  // Función para mostrar los productos en el HTML
    function mostrarCarrito() {
    var HTML = '';

    carrito.forEach(function(elemento) {
        HTML += `
            <li class="elementoCarrito">
                <h3>${elemento.nombre}</h3>
                <p>Categoría: ${elemento.categoria}</p>
                <p>Precio: $${elemento.precio.toFixed(2)}</p>
                <p>Cantidad: $${elemento.cantidad}</p>
            </li>
        `;
    });

    document.getElementById('lista-carrito').innerHTML = HTML;
}

// Función para calcular el total de precio del carrito de compras
function calcularTotal() {
    var total = 0;
    carrito.forEach(function (producto) {
        total += producto.precio * producto.cantidad;
    });
    document.getElementById('total-carrito').textContent = "$" + total.toFixed(2);
}

 // Generar array de productos sin repetir frutas o verduras
    var productos = generarProductos(5);
// Llamar a la función mostrarProductos para mostrar los productos al cargar la página
mostrarProductos();

