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

const allProducts = async (page, id, orderByName, orderByPrice) => {
    const resgistropp = 6;
    const desde = page * resgistropp;

    const category = id? {category: id} : {}

    const orderBy = orderByName? ["name", `${orderByName}`] : orderByPrice? ["price", `${orderByPrice}`] : []

    console.log('orderBy', orderBy)
    
        let products = await Product.findAndCountAll({
            where: category, 
            order: [orderBy],
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


const productsByName = async (page, name, orderByName, orderByPrice) => {
    const resgistropp = 6;
    const desde = page * resgistropp;

    if(!orderByName && !orderByPrice) {
        let productsByName = await Product.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + name + '%'
                }
            },
            offset: desde, 
            limit: resgistropp
        })
        //allProducts = JSON.parse(JSON.stringify(allProducts));
        if(productsByName.count <= 0) {
            return "No results";
        } else {
            return {
                status: 'success',
                page: {
                    desde,
                    resgistropp,
                    count: productsByName.count
                },
                rows: productsByName.rows
            };
        }
    }


    if(orderByName) {
        let productsByName = await Product.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + name + '%'
                }
            },
            order: [
                ["name", `${orderByName}`],
            ],
            offset: desde, 
            limit: resgistropp
        })

        if(productsByName.count <= 0) {
            return "No results";
        } else {
            return {
                status: 'success',
                page: {
                    desde,
                    resgistropp,
                    count: productsByName.count
                },
                rows: productsByName.rows
            };
        }
    } else {
        let productsByName = await Product.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + name + '%'
                }
            },
            order: [
                ["price", `${orderByPrice}`],
            ],
            offset: desde, 
            limit: resgistropp
        })
        //allProducts = JSON.parse(JSON.stringify(allProducts));
        if(productsByName.count <= 0) {
            return "No results";
        } else {
            return {
                status: 'success',
                page: {
                    desde,
                    resgistropp,
                    count: productsByName.count
                },
                rows: productsByName.rows
            };
        }
    }


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
    const {orderByName} = req.query;
    const {orderByPrice} = req.query;

    
        const result = await allProducts(page, id, orderByName, orderByPrice)
        return res.json(result);
    
})



// Para buscar productos por nombre
router.get('/products', async (req, res) => {
    const {name} = req.query;
    const page = Number(req.query.page) || 0;
    const {orderByName} = req.query;
    const {orderByPrice} = req.query;

    const result = await productsByName(page, name, orderByName, orderByPrice);
    res.json(result);
})

module.exports = router;
