/* const saveCartItems = () => {
  localStorage.clear();
  const arrayItemsToSave = document.querySelectorAll('.cart__item');
  const arrayItems = [];
  arrayItemsToSave.forEach((e) => {
    arrayItems.push(`${e.innerHTML}`);
  });
  const arrayJSON = JSON.stringify(arrayItems);
  localStorage.setItem('arrayItem', arrayJSON);
};
 */
const saveCartItems = () => {
  localStorage.clear();
  const arrayItemsToSave = document.querySelectorAll('.cart__item');
  const arrayItems = [];
  arrayItemsToSave.forEach((e) => {
    arrayItems.push(`${e.innerHTML}`);
  });
  const arrayJSON = JSON.stringify(arrayItems);
  localStorage.setItem('arrayItem', arrayJSON);
};

if (typeof module !== 'undefined') {
module.exports = saveCartItems;
}