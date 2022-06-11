// const app = require("../app");
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
    const resgistropp = 6;
    const desde = page * resgistropp;

    const category = id? {category: Number(id)} : name? {
        name: {
            [Op.like]: '%' + name + '%'
        }
    } : {}
    console.log('category', category)

    const orderBy = orderByName? [["name", `${orderByName}`]] : orderByPrice? [["price", `${orderByPrice}`]] : []

    console.log('orderBy', orderBy)
    
        let products = await Product.findAndCountAll({
            where: category, 
            order: orderBy,
            offset: desde, 
            limit: resgistropp
        });
        return {
            status: 'success',
            page: {
                desde,
                resgistropp,
                count: products.count
            },
            rows: products.rows
        };
}



// Para traer las categorías
router.get('/categories', async (req, res) => {
    const result = await categories();
    console.log('result', result)
    res.json(result);
})

// Para traer todos los productos
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
