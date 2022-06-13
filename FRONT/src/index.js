import swal from 'sweetalert';

const API_BASE_URL = 'https://online-shop-rs.herokuapp.com'


function productHtml (product) {
    return `<div class="divProducts" id="${product.name}">
                <p id="name-card">${product.name}</p>
                <img id="img-card" src="${product.url_image}" alt="img not found"/>
                <p id="price-card">S/ ${product.price.toFixed(2)}</p>
                <p id="dscto-card">Dscto: ${product.discount}%</p>
            </div>`
}


let page = 0;
let nameOrid = "&";
let orderBy = "&";
let url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`


function main(url) {
    let result = document.getElementById('result');
    result.innerHTML = "";

    console.log('url', url);

    const btnsPagination = document.getElementById('pagination')
    btnsPagination.innerHTML = "";

    fetch(url)
        .then(r => r.json())
        .then((response) => {
            if(response.rows.length <= 0) return result.innerHTML = "<p>Product not found</p>"
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
                return btnsPagination.innerHTML += `<button id="${number}" style="{${page} === ${number} ? {backgroundColor= "#280783", color= "white", borderColor:"white" , fontSize: "20px"} : undefined}">${number}</button>`
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

main(url)


async function categories() {
    let result = document.getElementById('first-column');

    await fetch(`${API_BASE_URL}/categories`)
        .then(r => r.json())
        .then((response) => {
            response.forEach((c) =>{
                const newBtn = `<button id="${c.id}"  >${c.name}</button>`;
                result.innerHTML += newBtn;
            })
        })
        .then(() => {
            const botones = Array.from(document.getElementById('first-column').children);
            botones.forEach(button => {
                button.addEventListener('click', (e) => {
                    page = 0;
                    nameOrid = `&id=${e.target['id']}`;
                    url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`;
                    
                    main(url);
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
    url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`
    main(url);
}



// Botones ordenar por nombre
const btnOrderByName = Array.from(document.getElementById('btns-orderName').children);
btnOrderByName.forEach(button => {
    button.addEventListener('click', (e) => {
        orderBy = `&orderByName=${e.target.innerHTML}`;
        page = 0;
        url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`;
        main(url);
        console.log('url', url)
    } 
)})


// Botones ordenar por precio
const btnOrderByPrice = Array.from(document.getElementById('btns-orderPrice').children);
btnOrderByPrice.forEach(button => {
    button.addEventListener('click', (e) => {
        orderBy = `&orderByPrice=${e.target.innerHTML}`;
        page = 0;
        url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`;
        main(url);
        console.log('url', url)
    } 
)})


// Botón Buscar
const search = document.getElementById('input-search');
search.addEventListener('input', updateValue)

function updateValue(e) {
    search.value = e.target.value;
}

const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    if(search.value === "") return swal("Ten cuidado!", "Ingresa el nombre de un producto", "warning");
    page = 0;
    nameOrid = `&name=${search.value}`;
    url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`
    main(url);
})


// Botón Reiniciar
const reset = document.getElementById('reset');
reset.addEventListener('click', (e) => {
    page = 0;
    nameOrid = "&";
    orderBy = "&";
    url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`
    main(url);
    search.value = "";
})