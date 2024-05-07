const express = require ('express')
const path = require ('path')
const app = express()
const PORT = 6060



const productsRouter = require("./routes/api/products.js")
const cartsRouter = require("./routes/api/carts.js")


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


app.use("/routes/api/products", productsRouter)
app.use("/routes/api/carts", cartsRouter)

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})








app.listen(PORT, ()=>{
    console.log(`servidor corriendo en servidor ${PORT}`)
})