//Proycto de pre_entrega
//creamos el array para process
const [,, metodo, recursos, ...detalle] = process.argv;
//URL de FAKE STORE
const URL_FAKE = 'https://fakestoreapi.com';
// Función principal asíncrona
const ejecutarTienda = async () => {
    switch (metodo?.toUpperCase()) {
    case 'GET':
        try {
            // Metodo: GET todos los productos
            const res = await fetch(`${URL_FAKE}/${recursos}`);
            const data = await res.json();
            console.log("--- RESULTADO DE CONSULTA ---");
            const dataReducida = data.map(p => ({
                id: p.id,
                title: p.title.substring(0, 18) + "...",
                price: p.price,
                category: p.category,
                description: p.description.substring(0, 20) + "..." // Recorta la descripción
}));
            // Usamos una table para que se vea profesional
            console.table(dataReducida);
        } catch (error) {
            console.error("Error al obtener productos:", error.message);
        }
        break;
    
    // Aquí irán los siguientes casos...
}
};
//ejecuta la tienda virtual
ejecutarTienda();
