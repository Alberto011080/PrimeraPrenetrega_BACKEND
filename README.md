## PRIMERA PREENTREGA PROYECTO FINAL

En esta primera preentrega he tenido  muchas dificultades desde el principio. El ir aprendidendo de forma rápida ha hecho que no me diera tiempo a practicar y sinceramente he tenido que pedir ayuda y aún así no he sido capaz de hacerlo del todo bien.

He empezado como decia el ejercicio creando estas rutas con express
![alt text](<Captura de pantalla 2024-05-07 a las 20.23.42.png>)

1. He insertado los comandos y redireccionado al puerto. En este caso al 6060.  He llamado a las rutas de productos y carrito y luego con los middlewards he insertado las extensiones. Tambien y por si acaso he agregado un elemento estático html aunque al final no ha sido necesario.

2. He instalado express en package.json, insertado el type module y redireccionado el elemento start del script.

3. Empezando con products me he encontrado comodo al principio con el elemento limit![alt text](<Captura de pantalla 2024-05-07 a las 20.28.35.png>) y los filtros para productos ya vistos en clase.


4. El problema ha empezado cuando he tendio que realizar el generarId... he tirado de ayuda pero creo que no ha quedado bien. de hecho no me entero ni yo leyendolo.

~~~
_const generateUniqueId = () => {  //Generamos un unico ID
    return products.length > 0 ? products[products.length - 1].id + 1 : 1;
};
router.post('/api/products', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    // Verificar si los campos requeridos están presentes en la solicitud
    if (title && description && code && price && stock && category && thumbnails) {
        const newProduct = {
            id: generateUniqueId(), // Generar un ID único
            title,
            description,
            code,
            price,
            status: true, // Valor predeterminado para 'status'
            stock,
            category,
            thumbnails
        };

        products.push(newProduct);
        res.status(201).json(newProduct); // Devolver el nuevo producto creado
    } else {
        res.status(400).json({ error: 'Faltan campos requeridos para agregar el producto' });
    }
});_
~~~

En fin que lo he intentado pero me ha superado un poco el asunto.


### CARTS
Con Carts.js me ha pasado un poco lo mismo. He empeazo bien siguiendo las indicaciones de las clase pero llega un momento que ya no sé por donde seguir y empiezo a tirar de ayudas y se me va al fiasco todo.
