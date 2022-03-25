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

async function sumAsync() {
  const itemsList = Array.from(queryAll('.cart__item'));
  const itemsNames = itemsList.map(({ innerText }) => innerText);
  const priceItemsList = itemsNames.map((cartName) => +cartName.split('PRICE: $')[1]);
  const eachPriceList = priceItemsList.reduce((acc, price) => acc + price, 0);
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = eachPriceList;
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
  sumAsync();
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

function loadingPage() {
  const itemSection = query('.items');
  const loading = document.createElement('p');
  loading.innerText = 'loading...';
  loading.className = 'loading';
  itemSection.appendChild(loading);
}
function removeLoardingPage() {
  const itemLoading = query('.items');
  const elementLoading = query('.loading');
  itemLoading.removeChild(elementLoading);
}

async function addElementToCart(id) {
  loadingPage();
  const fItem = await fetchItem(id);
  removeLoardingPage();
  console.log(fItem);
  const liItem = document.querySelector('.cart__items');
  liItem.appendChild(createCartItemElement(fItem));
  saveCartItems();
  sumAsync();
}

document.addEventListener('click', ({ target }) => {
  if (target.classList.contains('item__add')) {
    return addElementToCart(getSkuFromProductItem(target.parentElement));
  }
  if (target.classList.contains('empty-cart')) {
    document.querySelector('section .cart__items').innerHTML = '';
    saveCartItems();
  }
  sumAsync();
});

async function getProducts(name) {
  loadingPage();
  const { results } = await fetchProducts(name);
  removeLoardingPage();
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

function loadFromStorage() {
  const arrayStorage = getSavedCartItems();
  console.log(arrayStorage);
  arrayStorage.forEach((item) => addElementToCart(item));
}

window.onload = () => { 
  loadingPage();
  getProducts();
  removeLoardingPage();
  loadingPage();
  searchProduct();
  removeLoardingPage();
  if (localStorage.getItem('arrayItem') !== null) loadFromStorage();
};