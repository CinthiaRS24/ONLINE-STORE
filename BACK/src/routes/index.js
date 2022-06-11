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

const allProducts = async (page, orderByName, orderByPrice) => {
    const resgistropp = 6;
    const desde = page * resgistropp;
    

    if(!orderByName && !orderByPrice) {
        let products = await Product.findAll({ offset: desde, limit: resgistropp });
        const total = await Product.count();
        //allProducts = JSON.parse(JSON.stringify(allProducts));
        return {
            status: 'success',
            page: {
                desde,
                resgistropp,
                total
            },
            products
        };
    }

    if(orderByName) {
        let products = await Product.findAll({
            order: [
                ["name", `${orderByName}`],
            ],
            offset: desde, 
            limit: resgistropp
        })
        const total = await Product.count();
        //allProducts = JSON.parse(JSON.stringify(allProducts));
        return {
            status: 'success',
            page: {
                desde,
                resgistropp,
                total
            },
            products
        };
    } else {
        let products = await Product.findAll({
            order: [
                ["price", `${orderByPrice}`],
            ],
            offset: desde, 
            limit: resgistropp
        })
        const total = await Product.count();
        //allProducts = JSON.parse(JSON.stringify(allProducts));
        return {
            status: 'success',
            page: {
                desde,
                resgistropp,
                total
            },
            products
        };
    }
}



const productsByCategory = async (page, id, orderByName, orderByPrice) => {
    const resgistropp = 6;
    const desde = page * resgistropp;

    if(!orderByName && !orderByPrice) {
        let products  = await Product.findAndCountAll({
            where: {
                category: id
            },
            offset: desde, 
            limit: resgistropp
        })
        //productsByCategory = JSON.parse(JSON.stringify(productsByCategory));
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

    if(orderByName) {
        let products  = await Product.findAndCountAll({
            where: {
                category: id
            },
            order: [
                ["name", `${orderByName}`],
            ],
            offset: desde, 
            limit: resgistropp
        })
        //allProducts = JSON.parse(JSON.stringify(allProducts));
        return {
            status: 'success',
            page: {
                desde,
                resgistropp,
                count: products.count
            },
            rows: products.rows
        };
    } else {
        let products  = await Product.findAndCountAll({
            where: {
                category: id
            },
            order: [
                ["price", `${orderByPrice}`],
            ],
            offset: desde, 
            limit: resgistropp
        })
        //allProducts = JSON.parse(JSON.stringify(allProducts));
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
router.get('/', async (req, res) => {
    const page = Number(req.query.page) || 0;
    const {id} = req.query;
    const {orderByName} = req.query;
    const {orderByPrice} = req.query;

    if(id) {
        const result = await productsByCategory(page, id, orderByName, orderByPrice)
        return res.json(result);
    } else {
        const result = await allProducts(page, orderByName, orderByPrice)
        return res.json(result);
    }
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
