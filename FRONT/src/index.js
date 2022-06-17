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
let url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`;


function main(url) {
    let result = document.getElementById('result');
    result.innerHTML = "";

    const btnsPagination = document.getElementById('pagination')
    btnsPagination.innerHTML = "";

    showLoading(true);

    fetch(url)
        .then(r => r.json())
        .then((response) => {
            if(response.rows.length <= 0) return result.innerHTML = "<p>Product not found</p>";

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
                return btnsPagination.innerHTML += `<button id="${number}">${number}</button>`;
            });

            const botones = Array.from(document.getElementById('pagination').children);
            botones.forEach(button => {
                button.addEventListener('click', (e) => {
                    clickBtn(`${e.target.id - 1}`);
                });
            }); 

            let selectedPage = Number(page) + 1;
            let selectedBtn = document.getElementById(`${selectedPage}`);
            selectedBtn.style.backgroundColor = "green";

            showLoading(false);

        })
        .catch(error => {
            console.log(error);
            showLoading(false);
        });
}

main(url)


function categories() {
    let result = document.getElementById('first-column');

    fetch(`${API_BASE_URL}/categories`)
        .then(r => r.json())
        .then((response) => {
            response.forEach((c) =>{
                const newBtn = `<button id="category-${c.id}"  >${c.name}</button>`;
                result.innerHTML += newBtn;
            })
        })
        .then(() => {
            const botones = Array.from(document.getElementById('first-column').children);
            botones.forEach(button => {
                button.addEventListener('click', (e) => {
                    deleteStylesCategories();

                    let categoryId = e.target.id.slice(-1);
                    let selectedCategory = document.getElementById(`category-${categoryId}`)
                    selectedCategory.style.backgroundColor = "green";

                    page = 0;
                    nameOrid = `&id=${categoryId}`;
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
        deleteStylesOrder();

        let btn = document.getElementById(`name-${e.target.innerHTML}`);
        btn.style.backgroundColor = "green";

        orderBy = `&orderByName=${e.target.innerHTML}`;
        page = 0;
        url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`;
        main(url);
    } 
)})


// Botones ordenar por precio
const btnOrderByPrice = Array.from(document.getElementById('btns-orderPrice').children);
btnOrderByPrice.forEach(button => {
    button.addEventListener('click', (e) => {
        deleteStylesOrder();

        let btn = document.getElementById(`price-${e.target.innerHTML}`);
        btn.style.backgroundColor = "green";

        orderBy = `&orderByPrice=${e.target.innerHTML}`;
        page = 0;
        url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`;
        main(url);
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
    deleteStylesCategories();
    page = 0;
    nameOrid = `&name=${search.value}`;
    url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`
    main(url);
})


// Botón Reiniciar
const reset = document.getElementById('reset');
reset.addEventListener('click', (e) => {
    deleteStylesCategories();
    deleteStylesOrder();
    page = 0;
    nameOrid = "&";
    orderBy = "&";
    url = `${API_BASE_URL}/products?page=${page}${nameOrid}${orderBy}`
    main(url);
    search.value = "";
})


// Para eliminar estilos de botón seleccionado (categorías)
function deleteStylesCategories () {
    let totalCategories = document.getElementById('first-column').children.length;
    for (let i = 1; i <= totalCategories; i++) {
        let category = document.getElementById(`category-${i}`)
        category.style.background = null;
    }
}


// Para eliminar estilos de botón seleccionado (forma de ordenar)
function deleteStylesOrder () {
    let nameAsc = document.getElementById('name-ASC')
    let nameDesc = document.getElementById('name-DESC')
    let priceAsc = document.getElementById('price-ASC')
    let priceDesc = document.getElementById('price-DESC')

    nameAsc.style.background = null;
    nameDesc.style.background = null;
    priceAsc.style.background = null;
    priceDesc.style.background = null;
}

function showLoading(status) {
    let loading = document.getElementById('loading');

    if(status === true) {
        loading.classList.remove('div_hide');
    } else {
        loading.classList.add('div_hide');
    }
}