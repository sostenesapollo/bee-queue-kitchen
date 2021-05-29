require('dotenv').config();
const express = require("express")
const PORT    = process.env.PORT || 8000

const { placeOrder } = require('./kitchen')

express()
    .use(express.json())
    .use(express.urlencoded({ extended: false }))

    .get('/', (req, res) => {
        res.send("😋 Kitchen running..")
    })
    .post('/place_order', (req, res) => {
        const { order } = req.body
        try{ 
            placeOrder(order)
            console.log('🧾 New Order received.', order.products.length, 'products.\n----------------------------------');
            res.status(201).json({  order, status: "Placed" })
        }catch(e) {
            res.status(401).json({error: "Error to place order", message: e.message})
        }
    })

    .listen(PORT, ()=> console.log(`Running at port ${PORT}`))