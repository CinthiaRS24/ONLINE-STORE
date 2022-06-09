// const app = require("../app");
const { Router } = require('express');
const { where } = require('sequelize');
const router = Router();
const { Product, Category } = require('../db')


const categories = async () => {
    let categories = await Category.findAll()

    categories = JSON.parse(JSON.stringify(categories));

    return categories;
}

const allProducts = async () => {
    let allProducts = await Product.findAll()

    allProducts = JSON.parse(JSON.stringify(allProducts));

    return allProducts;
}
   
const productsByCategory = async (id) => {
    let productsByCategory = await Product.findAll({
        where: {
            category: id
        }
    })

    productsByCategory = JSON.parse(JSON.stringify(productsByCategory));

    return productsByCategory;
}

// Para traer las categorías
router.get('/categories', async (req, res) => {
    const result = await categories();
    console.log('result', result)
    res.json(result);
})

// Para traer todos los productos
router.get('/', async (req, res) => {
    const result = await allProducts();
    console.log('result', result)
    res.json(result);
})

// Para traer los productos por categoría
router.get('/productsByCategory/:id', async (req, res) => {
    const {id} = req.params;
    console.log('query', req.query);
    console.log('id', id)
    const result = await productsByCategory(id);
    // console.log('result', result)
    res.json(result);
})

module.exports = router;
