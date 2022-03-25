const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartItemClickListener({ target }) {
  document.querySelector('.cart__items').removeChild(target);
}

function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail: image }) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = image;
  img.className = 'cart_item_img';
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(img);
  return li;
}

async function addElementToCart(id) {
  const item = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const fechItem = await item.json();
  const liItem = document.querySelector('.cart__items');
  liItem.appendChild(createCartItemElement(fechItem));
}

document.addEventListener('click', ({ target }) => {
  if (target.classList.contains('item__add')) {
    return addElementToCart(getSkuFromProductItem(target.parentElement));
  }
  if (target.classList.contains('empty-cart')) {
    document.querySelector('section .cart__items').innerHTML = '';
  }
});

async function getProducts(name) {
  const products = await fetchProducts(name);
  const { results } = await products.json();
  results.forEach((product) => query('.items')
    .appendChild(createProductItemElement(product)));
}

function searchProduct() {
  const product = query('#query-input');
  query('#query-button').addEventListener('click', () => {
    query('.items').innerText = '';
    if (product.value === '') getProducts();
    getProducts(product.value);
  });
}

window.onload = () => { 
  getProducts();
  searchProduct();
};
