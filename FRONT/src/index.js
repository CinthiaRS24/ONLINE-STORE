
function allProducts() {
    let result = document.getElementById('result');

    fetch('http://localhost:3050/')
        .then(r => r.json())
        .then((response) => {
            console.log(response);
            return response.map((p) =>{
                let newDiv = productHtml(p);
                console.log('newDiv', newDiv)
                // var newDiv = document.createElement("div")

                // var nombre = document.createElement("p")
                // nombre.setAttribute("id","title");
                // nombre.innerHTML += p.name
                // newDiv.appendChild(nombre)

                // var imagen = document.createElement("img")
                // imagen.setAttribute("id","img");
                // imagen.src += p.url_image
                // imagen.alt += "img not found"
                // newDiv.appendChild(imagen)

                // var precio = document.createElement("p")
                // precio.setAttribute("id","price");
                // precio.innerHTML += `Precio: ${p.price}`
                // newDiv.appendChild(precio)

                // var descuento = document.createElement("p")
                // descuento.setAttribute("id","dscto");
                // descuento.innerHTML += `Dscto: ${p.discount}`
                // newDiv.appendChild(descuento)
                

                result.innerHTML += newDiv
            })
        })
        .catch(error => 
            console.log(error));
        
}


allProducts();

function categories() {
    let result = document.getElementById('first-column');

    fetch('http://localhost:3050/categories')
        .then(r => r.json())
        .then((response) => {
            console.log(response);
            return response.map((c) =>{

                var category = document.createElement("button")
                category.setAttribute("id","category");
                category.innerHTML += c.name

                result.appendChild(category)
            })
        })
        .catch(error => 
            console.log(error));
        
}

categories();


// function productsByCategory() {
//     let result = document.getElementById('first-column');

//     fetch(`http://localhost:3050/productsByCategory?id=${id}`)
//         .then(r => r.json())
//         .then((response) => {
//             console.log(response);
//             return response.map((c) =>{

//                 var category = document.createElement("button")
//                 category.setAttribute("id","category");
//                 category.innerHTML += c.name

//                 result.appendChild(category)
//             })
//         })
//         .catch(error => 
//             console.log(error));
        
// }


// productsByCategory();

function productHtml (product) {
    return `<div id="${product.name}">
                <p id="name-card">${product.name}</p>
                <img id="img-card" src="${product.url_image}" alt="img not found"/>
                <p id="price-card">Precio: ${product.price}</p>
                <p id="dscto-card">Dscto: ${product.discount}</p>
            </div>`
}