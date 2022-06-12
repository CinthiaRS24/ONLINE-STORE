const { Router } = require('express');
const { Op } = require('sequelize');
const router = Router();
const { Product, Category } = require('../db')



const categories = async () => {
    let categories = await Category.findAll()
    categories = JSON.parse(JSON.stringify(categories));
    return categories;
}


const allProducts = async (page, id, name, orderByName, orderByPrice) => {
    const productsPerPage = 6;
    const desde = page * productsPerPage;

    const category = id? {category: Number(id)} : name? {
        name: {
            [Op.like]: '%' + name + '%'
        }
    } : {}

    const orderBy = orderByName? [["name", `${orderByName}`]] : orderByPrice? [["price", `${orderByPrice}`]] : []

    
    let products = await Product.findAndCountAll({
        where: category, 
        order: orderBy,
        offset: desde, 
        limit: productsPerPage
    });

    return {
        status: 'success',
        page: {
            desde,
            productsPerPage,
            count: products.count
        },
        rows: products.rows
    };
}



// Ruta para traer las categorías
router.get('/categories', async (req, res) => {
    const result = await categories();
    console.log('result', result)
    res.json(result);
})

// Ruta para traer los productos solicitados
router.get('/products', async (req, res) => {
    const page = Number(req.query.page) || 0;
    const {id} = req.query;
    const {name} = req.query
    const {orderByName} = req.query;
    const {orderByPrice} = req.query;
    
    const result = await allProducts(page, id, name, orderByName, orderByPrice)
    return res.json(result);
})



module.exports = router;
