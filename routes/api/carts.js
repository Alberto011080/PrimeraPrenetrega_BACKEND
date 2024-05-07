const express = require("express")
const router = express.Router()

const carts = []

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// Función para leer los datos de un archivo JSON
function readDataFromFile(products) {
    try {
        const data = fs.readFileSync(products, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        return [];
    }
}

// Función para escribir datos en un archivo JSON
function writeDataToFile(products, data) {
    try {
        fs.writeFileSync(products, JSON.stringify(data, null, 4));
    } catch (err) {
        console.error('Error al escribir en el archivo:', err);
    }
}

// Ruta POST /api/cart
router.post('/', (req, res) => {
    try {
        // Generar un nuevo ID para el carrito
        const cartId = uuidv4();

        // Crear un nuevo carrito con un array vacío de productos
        const newCart = {
            id: cartId,
            products: []
        };

        // Leer los carritos existentes
        const carts = readDataFromFile('carrito.json');

        // Agregar el nuevo carrito a la lista
        carts.push(newCart);

        // Escribir los carritos actualizados en el archivo
        writeDataToFile('carrito.json', carts);

        res.json(newCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta GET /api/cart/:cid
router.get('/:cid', (req, res) => {
    try {
        const cartId = req.params.cid;

        // Leer los carritos existentes
        const carts = readDataFromFile('carrito.json');

        // Encontrar el carrito con el ID proporcionado
        const cart = carts.find(cart => cart.id === cartId);

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.json(cart.products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta POST /api/cart/:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = 1; // Se agregará un producto a la vez

        // Leer los carritos existentes
        const carts = readDataFromFile('carrito.json');

        // Encontrar el carrito con el ID proporcionado
        const cart = carts.find(cart => cart.id === cartId);

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Leer los productos existentes
        let products = readDataFromFile('productos.json');

        // Encontrar el producto con el ID proporcionado
        const product = products.find(product => product.id === productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(item => item.product === productId);

        if (existingProduct) {
            // Si el producto ya existe, incrementar la cantidad
            existingProduct.quantity += quantity;
        } else {
            // Si el producto no existe, agregarlo al carrito
            cart.products.push({
                product: productId,
                quantity: quantity
            });
        }

        // Escribir los carritos actualizados en el archivo
        writeDataToFile('carrito.json', carts);

        res.json(cart.products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;

router.get("/api/carts", (req,res)=>{
    res.json(products)
})

router.post("/api/carts", (req,res)=>{
    newProduct = req.products
    carts.push(newProduct)
    res.json({message: "Prodcuto añadido correctamente"})
})

module.exports = router