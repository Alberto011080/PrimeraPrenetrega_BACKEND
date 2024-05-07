const express = require("express")
const router = express.Router()

const products = []

router.get("/api/products", (req,res)=>{
    res.json(products)
})

router.get('/api/products', (req, res) => {
    const limit = req.query.limit; // Obtener el parámetro 'limit' si está presente

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit)); // Limitar el número de productos
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
})

// Ruta para obtener un producto por su id
router.get('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
})

const generateUniqueId = () => {  //Generamos un unico ID
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
});



router.post("/api/products", (req,res)=>{
    const newProduct = req.body
    products.push(newProduct)
    res.json({message: "Prodcuto añadido correctamente"})
})



router.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        
       
        const deletedProduct = await this.findByIdAndDelete(productId)
        
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
})



module.exports = router