# DOCUMENTACIÓN

Esta API permite llamadas del tipo REST y utiliza JSON para el envío y recepción de información.

## Convenciones utilizadas
- Se utilizan dos urls base por recurso "/categories ", "/products"
- Las consultas a la base de datos se realizan utilizando el ORM Sequelize.
- La búsqueda por nombre se realiza utilizando el método “Op.like”. Sequelize proporciona varios métodos para ayudar a consultar su base de datos.
- La paginación se realiza en base a la respuesta JSON, considerando mostrar 6 productos por página.

## Herramientas útiles
- Para realizar peticiones REST de forma sencilla pueden utilizar una extensión de un Cliente REST del Google Chrome, Postman, insomnia, etc.
- Para ver los principales métodos que Sequelize pone a nuestra disposición, pueden revisar este [enlace](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
- Para procesar los ejemplos, utiliza postman.

## Lista de endpoints
La API puede ser llamada de la siguiente manera dependiendo de lo que el cliente solicite:

### /categories
Para devolver todas las categorías existentes.

### /products
Para devolver los productos solicitados por el cliente con la correspondiente paginación. Con este endpoint, el cliente puede obtener la totalidad de los productos, o también dependiendo de los query parámetros que se agreguen, puede obtener los productos de cierta categoría, los productos ordenados por nombre, ordenados por precio, o algún producto en específico.
Los endpoints mencionados anteriormente, son resueltos por los métodos “categories” y “allProducts” respectivamente. Cada método recibe los parámetros GET y devuelve un json con la respuesta a lo solicitado por el cliente.

## Categorías

### GET /categories

#### Respuesta:
```
[
    {
        "id": 1,
        "name": "bebida energetica"
    },
    {
        "id": 2,
        "name": "pisco"
    },
    {
        "id": 3,
        "name": "ron"
    },
    {
        "id": 4,
        "name": "bebida"
    },
    {
        "id": 5,
        "name": "snack"
    },
    {
        "id": 6,
        "name": "cerveza"
    },
    {
        "id": 7,
        "name": "vodka"
    }
]
```

## Productos

### GET /products

#### Parámetros:
- *page*, indica la página que desea ver (de acuerdo al paginado, se muestran 6 productos por página).
- *id*, hace referencia a la categoría, con este parámetro se realiza el filtro de obtener los productos de cierta categoría.
- *name*, permite filtrar por nombre del producto.
- *orderByName*, permite filtrar por nombre, ya sea de manera ascendente o descendente.
- *orderByPrice*, permite filtrar por precio, ya sea de manera ascendente o descendente.

#### Ejemplos:
- GET /products
- GET /products?page=2
- GET /products?page=2&id=1
- GET /products?page=2&name=ener
- GET /products?id=5&orderByName=asc
- GET /products?name=man&orderByPrice=desc
- GET /products?orderByPrice=asc

#### Respuesta:
```
{
    "status": "success",
    "page": {
        "desde": 0,
        "productsPerPage": 6,
        "count": 57
    },
    "rows": [
        {
            "id": 5,
            "name": "ENERGETICA MR BIG",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
            "price": 1490,
            "discount": 20,
            "category": 1
        },
        {
            "id": 6,
            "name": "ENERGETICA RED BULL",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
            "price": 1490,
            "discount": 0,
            "category": 1
        },
        {
            "id": 7,
            "name": "ENERGETICA SCORE",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
            "price": 1290,
            "discount": 0,
            "category": 1
        },
        {
            "id": 8,
            "name": "PISCO ALTO DEL CARMEN 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
            "price": 7990,
            "discount": 10,
            "category": 2
        },
        {
            "id": 9,
            "name": "PISCO ALTO DEL CARMEN 40º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg",
            "price": 5990,
            "discount": 0,
            "category": 2
        },
        {
            "id": 10,
            "name": "PISCO ARTESANOS 35º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/artesanos8818.jpg",
            "price": 3990,
            "discount": 0,
            "category": 2
        }
    ]
}
```


