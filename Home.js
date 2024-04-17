async function Product() {
    try {
        const response = await fetch('shoes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

async function krijgproducten() {
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await Product();
    }
    const alles = document.getElementById('product');
    alles.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const listItem = document.createElement('div');
        listItem.classList.add('product');
        listItem.innerHTML = `
        
            <img class="product-image" src="${item.image}" alt="Image of ${item.productname}">
            <h1 class="product-name">${item.productname}</h1>
            <h2 class="product-info">${item.productinfo}</h5>
            <h3 class="product-price">${item.price}</h3>
        
        `;
        alles.appendChild(listItem);
    }
}
document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        krijgproducten();
    }
});

krijgproducten();