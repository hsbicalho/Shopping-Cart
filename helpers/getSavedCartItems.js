const getSavedCartItems = () => {
  const localItems = localStorage.getItem('arrayItem');
  const cartItemList = JSON.parse(localItems);
  if (localItems !== null) {
    const finalArray = cartItemList.map((item) => {
    const itemFromStorage = item; 
    const sku = itemFromStorage.split(' ');
      return (sku[1]);
    });
  return finalArray;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
