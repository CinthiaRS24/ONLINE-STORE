function productHtml (product) {
    return `<div class="divProducts" id="${product.name}">
                <p id="name-card">${product.name}</p>
                <img id="img-card" src="${product.url_image}" alt="img not found"/>
                <p id="price-card">S/ ${product.price.toFixed(2)}</p>
                <p id="dscto-card">Dscto: ${product.discount}%</p>
            </div>`
}



async function categories() {
    let result = document.getElementById('first-column');

    await fetch('http://localhost:3050/categories')
        .then(r => r.json())
        .then((response) => {
            response.forEach((c) =>{
                const newBtn = `<button id="${c.id}">${c.name}</button>`
                result.innerHTML += newBtn
            })
        })
        .then(() => {
            const botones = Array.from(document.getElementById('first-column').children);
            botones.forEach(button => {
                button.addEventListener('click', (e) => {
                    productsByCategory(e.target['id']);
                } 
            )})
           
        })
        .catch(error => 
            console.log(error));   
}

categories();


function allProducts() {
    let result = document.getElementById('result');
    result.innerHTML = "";
    let allProducts = [];

    fetch('http://localhost:3050/')
        .then(r => r.json())
        .then((response) => {
            response.forEach((p) =>{
                let newDiv = productHtml(p);
                // result.innerHTML += newDiv
                allProducts.push(newDiv);
            })
        })
        .then(() => {
            pagination(allProducts);
        })
       
        .catch(error => 
            console.log(error));  
}

allProducts();


function productsByCategory(id) {
    // Ocultar el contenido del div
    let result = document.getElementById('result');
    result.innerHTML = "";
    let allProducts = [];

    fetch(`http://localhost:3050/productsByCategory?id=${id}`)
        .then(r => r.json())
        .then((response) => {
            response.forEach((p) =>{
                let newDiv = productHtml(p);
                // result.innerHTML += newDiv;
                allProducts.push(newDiv);
            })
        })
        .then(() => {
            pagination(allProducts);
        })
        .catch(error => 
            console.log(error));  
}


function productsByName(name) {
    // Ocultar el contenido del div
    let result = document.getElementById('result');
    result.innerHTML = "";
    let allProducts = [];

    fetch(`http://localhost:3050/products?name=${name}`)
        .then(r => r.json())
        .then((response) => {
            if(!Array.isArray(response)) result.innerHTML = "<p>No results</p>";

            response.forEach((p) =>{
                let newDiv = productHtml(p);
                // result.innerHTML += newDiv;
                allProducts.push(newDiv);
            })
        })
        .then(() => {
            pagination(allProducts);
        })
        .catch(error => 
            console.log(error));  
}


// Botón reset
const reset = document.getElementById('reset');
console.log('reset', reset)
reset.addEventListener('click', allProducts)


// Botón search
const search = document.getElementById('input-search');
search.addEventListener('input', updateValue)
console.log('search1', search.value)

function updateValue(e) {
    search.value = e.target.value;
}

const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    productsByName(search.value)})




function pagination (allProducts) {

    const result = document.getElementById('result');
    result.innerHTML = "";

    // Cantidad de productos
    const cantidadProductos = allProducts.length;

    let currentPage = 1;
    let productsPerPage = 6;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    for (let i = 0; i < currentProducts.length; i++) {
        result.innerHTML += currentProducts[i];
        
    }

    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(cantidadProductos/productsPerPage); i++) {
        pageNumbers.push(i + 1);
        
    }

    const btnsPagination = document.getElementById('pagination')
    btnsPagination.innerHTML = "";
    pageNumbers.map((number) => {
        return btnsPagination.innerHTML += `<button id="${number}">${number}</button>`
    })

    const botones = Array.from(document.getElementById('pagination').children);
        botones.forEach(button => {
            button.addEventListener('click', (e) => {
                porPagina(e.target.id, allProducts);
            } 
        )})
}


function porPagina (number, allProducts) {
    const result = document.getElementById('result');
    result.innerHTML = "";

    let currentPage = number;
    let productsPerPage = 6;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    for (let i = 0; i < currentProducts.length; i++) {
        result.innerHTML += currentProducts[i];
    }

}

