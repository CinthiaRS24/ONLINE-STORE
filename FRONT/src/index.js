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
                    nameOid = `&id=${e.target['id']}`
                    link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
                    main(link);
                    console.log('Link', link)
                } 
            )})
           
        })
        .catch(error => 
            console.log(error));   
}

categories();



let page = 0;
let nameOid = "&";
let orderBy = "&";
let link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`


function main(link) {
    let result = document.getElementById('result');
    result.innerHTML = "";

    const btnsPagination = document.getElementById('pagination')
    btnsPagination.innerHTML = "";

    console.log('link', link)
    fetch(link)
        .then(r => r.json())
        .then((response) => {
            console.log('response', response)

            response.rows.forEach((p) =>{
                let newDiv = productHtml(p);
                result.innerHTML += newDiv
            })   

           
            const total = response.page.count;
            const pageNumbers = [];
            for (let i = 0; i < Math.ceil(total/6); i++) {
                pageNumbers.push(i + 1);   
            }

            pageNumbers.map((number) => {
                return btnsPagination.innerHTML += `<button id="${number}">${number}</button>`
            })

            const botones = Array.from(document.getElementById('pagination').children);
            botones.forEach(button => {
                button.addEventListener('click', (e) => {
                clickBtn(`${e.target.id - 1}`);
            })
            }) 
        })

}

main(link)


function clickBtn(number) {
    page = number;
    console.log('btnpage', page)
    link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
    main(link);
    console.log('Link2', link)
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
reset.addEventListener('click', (e) => {
    page = 0;
    nameOid = "&";
    orderBy = "&";
    link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
    main(link);
    console.log('Link', link)
})


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
    nameOid = `&name=${search.value}`;
    link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
    main(link);
    console.log('Link', link)
})





const btnOrderByName = Array.from(document.getElementById('btns-orderName').children);
btnOrderByName.forEach(button => {
    button.addEventListener('click', (e) => {
        orderBy = `&orderByName=${e.target.innerHTML}`
        link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
        main(link);
        console.log('Link', link)
    } 
)})

const btnOrderByPrice = Array.from(document.getElementById('btns-orderPrice').children);
btnOrderByPrice.forEach(button => {
    button.addEventListener('click', (e) => {
        orderBy = `&orderByPrice=${e.target.innerHTML}`
        link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
        main(link);
        console.log('Link', link)
    } 
)})