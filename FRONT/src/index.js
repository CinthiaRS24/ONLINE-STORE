function productHtml (product) {
    return `<div class="divProducts" id="${product.name}">
                <p id="name-card">${product.name}</p>
                <img id="img-card" src="${product.url_image}" alt="img not found"/>
                <p id="price-card">S/ ${product.price.toFixed(2)}</p>
                <p id="dscto-card">Dscto: ${product.discount}%</p>
            </div>`
}


let page = 0;
let nameOid = "&";
let orderBy = "&";
let link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`


function main(link) {
    let result = document.getElementById('result');
    result.innerHTML = "";

    const btnsPagination = document.getElementById('pagination')
    btnsPagination.innerHTML = "";

    fetch(link)
        .then(r => r.json())
        .then((response) => {
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
        .catch(error => {
            console.log(error)
        });
}

main(link)


async function categories() {
    let result = document.getElementById('first-column');

    await fetch('http://localhost:3050/categories')
        .then(r => r.json())
        .then((response) => {
            response.forEach((c) =>{
                const newBtn = `<button id="${c.id}">${c.name}</button>`;
                result.innerHTML += newBtn;
            })
        })
        .then(() => {
            const botones = Array.from(document.getElementById('first-column').children);
            botones.forEach(button => {
                button.addEventListener('click', (e) => {
                    nameOid = `&id=${e.target['id']}`;
                    link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`;
                    main(link);
                }) 
            })
        })
        .catch(error => {
            console.log(error)
        });   
}

categories();


function clickBtn(number) {
    page = number;
    link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
    main(link);
}



// Botones ordenar por nombre
const btnOrderByName = Array.from(document.getElementById('btns-orderName').children);
btnOrderByName.forEach(button => {
    button.addEventListener('click', (e) => {
        orderBy = `&orderByName=${e.target.innerHTML}`
        link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
        main(link);
        console.log('Link', link)
    } 
)})


// Botones ordenar por precio
const btnOrderByPrice = Array.from(document.getElementById('btns-orderPrice').children);
btnOrderByPrice.forEach(button => {
    button.addEventListener('click', (e) => {
        orderBy = `&orderByPrice=${e.target.innerHTML}`
        link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
        main(link);
        console.log('Link', link)
    } 
)})


// Botón Search
const search = document.getElementById('input-search');
search.addEventListener('input', updateValue)

function updateValue(e) {
    search.value = e.target.value;
}

const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    nameOid = `&name=${search.value}`;
    link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
    main(link);
})


// Botón Reset
const reset = document.getElementById('reset');
reset.addEventListener('click', (e) => {
    page = 0;
    nameOid = "&";
    orderBy = "&";
    link = `http://localhost:3050/products?page=${page}${nameOid}${orderBy}`
    main(link);
    search.value = "";
})