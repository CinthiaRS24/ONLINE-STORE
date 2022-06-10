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

const allProducts = async () => {
    let allProducts = await Product.findAll()

    allProducts = JSON.parse(JSON.stringify(allProducts));

    return allProducts;
}

const allProductsOrderByName = async (orderByName) => {
    let allProducts = await Product.findAll({
        order: [
            ["name", `${orderByName}`],
        ],
    })

    allProducts = JSON.parse(JSON.stringify(allProducts));

    return allProducts;
}

const allProductsOrderByPrice = async (orderByPrice) => {
    let allProducts = await Product.findAll({
        order: [
            ["price", `${orderByPrice}`],
        ],
    })

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


const productsByName = async (name) => {
    let productsByName = await Product.findAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%'
            }
        },
    })

    productsByName = JSON.parse(JSON.stringify(productsByName));

    if(productsByName.length <= 0) {
        return "No results";
    } else {
        return productsByName;
    }

}




// Para traer las categorías
router.get('/categories', async (req, res) => {
    const result = await categories();
    console.log('result', result)
    res.json(result);
})

// Para traer todos los productos
router.get('/', async (req, res) => {
    const {orderByName} = req.query;
    const {orderByPrice} = req.query;


    if(!orderByName && !orderByPrice) {
        const result = await allProducts();
        res.json(result);
    }

    const result = orderByName? await allProductsOrderByName(orderByName) : await allProductsOrderByPrice(orderByPrice);
    
    console.log('result', result)
    res.json(result);
})

// Para traer los productos por categoría
router.get('/productsByCategory', async (req, res) => {
    const {id} = req.query;
    console.log('query', req.query);
    console.log('id', id)
    const result = await productsByCategory(id);
    // console.log('result', result)
    res.json(result);
})

// Para buscar productos por nombre
router.get('/products', async (req, res) => {
    const {name} = req.query;
    console.log('name', name)
    const result = await productsByName(name);
    // console.log('result', result)
    res.json(result);
})

module.exports = router;
