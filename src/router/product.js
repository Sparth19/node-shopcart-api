const express = require("express")
const Product = require("../model/Products")
const auth = require("../middleware/auth")
const router = new express.Router()

//Create Product by authenticated user
router.post("/products/create", auth, async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            owner: req.user._id
        })
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Update product by authenticated user
router.patch("/products/updateProduct/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ["title", "imageUrl", "description", "category"]
    const isValid = updates.every((update) => allowUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({ "error": "No such property to update" })
    }

    try {
        const product = await Product.findOne({ _id: req.params.id, owner: req.user._id })
        if (!product) {
            return res.status(404).send()
        }
        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

//Read all products..
router.get("/products/readAllProduct/", auth, async (req, res) => {
    try {
        const product = await Product.find({})
        if (!product) {
            return res.status(404).send()
        }
        res.status(200).send(product)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Read user product
router.get("/products/readUserProduct/", auth, async (req, res) => {
    try {
        const product = await Product.find({ owner: req.user._id })
        console.log(product)
        if (!product) {
            return res.status(404).send()
        }
        res.status(200).send(product)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Delete user Product
router.delete("/products/delete/:id", auth, async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!product) {
            return res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        return res.status(500).send(e)
    }
})

module.exports = router