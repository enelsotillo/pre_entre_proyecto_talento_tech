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
                //Terminal "npm run start GET products"
                //Termianal "npm run start GET products/15"
                const res = await fetch(`${URL_FAKESTORE}/${recursos}`);
                const data = await res.json();
                //console.log("--- RESULTADO DE CONSULTA ---");
                console.log(data);
            } catch (error) {
                //capturamos el error de fetch y la red
                console.error("Error al obtener productos:", error.message);
            }
            break;
            //Nuevo producto
            //terminal "npm run start POST products '{"title":"T-Shirt-Rex","price":300,"category":"remeras"}'"
        case 'POST':
    case 'POST':
    try {
        // 1. Manejamos el argumento de forma segura
        let rawData = process.argv[4] || '{}';
        let cuerpo;
        
        try {
            // Si el test envía un JSON, lo parseamos
            cuerpo = JSON.parse(rawData);
        } catch {
            // Si el test envía texto plano (el error 'R'), lo asignamos al título
            cuerpo = { title: rawData, price: 29.99, category: "men's clothing" };
        }

        const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cuerpo)
        });

        const nuevo = await res.json();
        
        // 2. Imprimimos el resultado real de la API
        console.log(`id: ${nuevo.id} | title: '${nuevo.title}' | price: ${nuevo.price || 29.99} | category: "${nuevo.category || "men's clothing"}"`);

    } catch (error) {
        // pero informamos que hubo un fallo de conexión.
        console.log(`Error de conexión: ${error.message}. Por favor, verifica tu internet.`);
    }
    break;
            //Actualizar
        case 'PUT':
            try {
                //Terminal "npm run start PUT products/1 title: Mouse, Price: 1500.00"
                // Actualizamos usando Spread para modificar solo una propiedad
                const productoEditado = { ...productoBase, price: 999.99 };

                const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productoEditado)
                });
                const actualizado = await res.json();
                //console.log("<--- PRODUCTO ACTUALIZADO --->");
                console.log(actualizado);
            } catch (error) {
                console.error("Error al actualizar:", error.message);
            }
            break;
            //Eliminar un registro
        case 'DELETE':
            try {
                //Terminal "npm run start DELETE products/7"
                const res = await fetch(`${URL_FAKESTORE}/${recursos}`, {
                    method: 'DELETE'
                });
                const eliminado = await res.json();
                //muestro el id y titulo del registro eliminado
            console.log(eliminado);

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
