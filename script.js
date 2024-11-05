// script.js

// Selecionar elementos
const cartContainer = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-btn");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cart = [];  // Array que vai armazenar os itens do carrinho

// Função para atualizar o total do carrinho
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceElement.textContent = total.toFixed(2);
}

// Função para adicionar um item ao carrinho
function addToCart(product) {
    // Adicionar o item ao array do carrinho
    cart.push(product);

    // Atualizar a lista de itens no carrinho
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <span>${product.name}</span>
        <span>R$ ${product.price.toFixed(2)}</span>
        <button class="remove-item">Remover</button>
    `;

    // Adicionar o item ao DOM
    cartContainer.appendChild(cartItem);

    // Adicionar evento de remover
    cartItem.querySelector(".remove-item").addEventListener("click", () => {
        removeFromCart(product, cartItem);
    });

    // Atualizar o total
    updateTotal();
}

// Função para remover um item do carrinho
function removeFromCart(product, cartItemElement) {
    // Filtrar o item do array do carrinho
    cart = cart.filter(item => item !== product);

    // Remover o item do DOM
    cartItemElement.remove();

    // Atualizar o total
    updateTotal();
}

// Adicionar produtos ao carrinho ao clicar nos botões
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productElement = button.closest(".product");
        const productName = productElement.getAttribute("data-name");
        const productPrice = parseFloat(productElement.getAttribute("data-price"));

        const product = {
            name: productName,
            price: productPrice
        };

        addToCart(product);
    });
});

// Função para finalizar a compra
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("O carrinho está vazio!");
    } else {
        alert(`Compra realizada com sucesso! Total: R$ ${totalPriceElement.textContent}`);
        cart = [];  // Limpar o carrinho
        cartContainer.innerHTML = "";  // Limpar a lista de itens no DOM
        updateTotal();  // Atualizar total
    }
});
