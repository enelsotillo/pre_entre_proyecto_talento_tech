// Proyecto de pre_entrega Alumno: Enel Sotillo
// Creamos el array para process usando destructuring
// [,, metodo, recursos, ...detalle] captura:
// node index.js GET products/1 -> metodo="GET", recursos="products/1"
const [,, metodo, recursos, ...detalle] = process.argv;

// url de FAKE STORE
const URL_FAKESTORE = 'https://fakestoreapi.com';


// Función principal asíncrona
const ejecutarTienda = async () => {
    
    // Producto molde modelo para usar con Spread Operator en POST y PUT 
    const productoBase = {
        title: "Enel",
        price: 150.0,
        description: "Descripción desde Node.js",
        category: "electronics"
    };

    switch (metodo?.toUpperCase()) {
        
        case 'GET':
            try {
                const res = await fetch(`${URL_FAKESTORE}/${recursos}`);
                const data = await res.json();
                console.log("--- RESULTADO DE CONSULTA ---");

                // Verificamos si data es un array (varios) o un objeto (uno solo)
                if (Array.isArray(data)) {
                    const dataReducida = data.map(p => ({
                        id: p.id,
                        title: p.title.substring(0, 18) + "...",
                        price: p.price,
                        category: p.category,
                        description: p.description.substring(0, 20) + "..."
                    }));
                    //todos los productos
                    console.table(dataReducida);
                } else {
                    // Si es un solo producto, mostramos solo ese
                    console.table([data]);
                }
            } catch (error) {
                //capturamos el error de fetch y la red
                console.error("Error al obtener productos:", error.message);
            }
            break;

        case 'POST':
            try {
                // Creamos el nuevo objeto usando Spread Operator
                const nuevoProducto = { ...productoBase, title: "Nuevo Item Creado" };

                const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoProducto)
                });
                const creado = await res.json();
                console.log("--- PRODUCTO CREADO (POST) ---");
                console.log(creado);
            } catch (error) {
                console.error("Error al crear producto:", error.message);
            }
            break;

        case 'PUT':
            try {
                //Así utilizamos en terminal npm run start PUT products/1 title: Mouse, Price: 1500.00
                // Actualizamos usando Spread para modificar solo una propiedad
                const productoEditado = { ...productoBase, price: 999.99 };

                const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productoEditado)
                });
                const actualizado = await res.json();
                console.log("--- PRODUCTO ACTUALIZADO (PUT) ---");
                console.log(actualizado);
            } catch (error) {
                console.error("Error al actualizar:", error.message);
            }
            break;

        case 'DELETE':
            try {
                const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
                    method: 'DELETE'
                });
                const eliminado = await res.json();
                console.log("--- PRODUCTO ELIMINADO (DELETE) ---");
                console.log(eliminado);
            } catch (error) {
                console.error("Error al borrar:", error.message);
            }
            break;

        default:
            console.log("Comando no reconocido. Formato: GET|POST|PUT|DELETE productos/ID");
    }
};

// Ejecuta la tienda virtual 
ejecutarTienda();
