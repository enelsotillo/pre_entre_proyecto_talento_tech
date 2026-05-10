// Proyecto de pre_entrega Alumno: Enel Sotillo
// Creamos el array para process usando destructuring
// [,, metodo, recursos, ...detalle] captura:
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
                //Terminal npm run start GET products
                //Termianal npm run start GET products/15
                const res = await fetch(`${URL_FAKESTORE}/${recursos}`);
                const data = await res.json();
                console.log("--- RESULTADO DE CONSULTA ---");

                // Verificamos si data es un array (varios) o un objeto
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
            //Nuevo producto
        case 'POST':
            try {
                //Terminar npm run start POST products T-Shirt-Rex 300 remeras
                // Creamos el nuevo objeto usando Spread Operator
                const nuevoProducto = { ...productoBase, title: "Nuevo Item Creado" };

                const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoProducto)
                });
                const creado = await res.json();
                console.log("<--- PRODUCTO CREADO --->");
                console.log(creado);
            } catch (error) {
                console.error("Error al crear producto:", error.message);
            }
            break;
            //Actualizar
        case 'PUT':
            try {
                //Terminal npm run start PUT products/1 title: Mouse, Price: 1500.00
                // Actualizamos usando Spread para modificar solo una propiedad
                const productoEditado = { ...productoBase, price: 999.99 };

                const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productoEditado)
                });
                const actualizado = await res.json();
                console.log("<--- PRODUCTO ACTUALIZADO --->");
                console.log(actualizado);
            } catch (error) {
                console.error("Error al actualizar:", error.message);
            }
            break;
            //Eliminar un registro
        case 'DELETE':
            try {
                //Terminal npm run start DELETE products/7
                const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
                    method: 'DELETE'
                });
                const eliminado = await res.json();
                //muestro el id y titulo del registro eliminado
            console.log(`Producto ID: ${eliminado.id} | Titulo: ${eliminado.title} -----> ELIMINADO`);

    } catch (error) {
        console.error("Error al borrar el ID:", error.message);
    }
    break;

        default:
            console.log("Comando no reconocido. Formato: GET|POST|PUT|DELETE products/ID");
    }
};

// Ejecuta la tienda virtual 
ejecutarTienda();
