const fetchItem = async (id) => {
  try {
  const fItem = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const item = await fItem.json();
  return item;
  } catch (error) {
    return error;
  }
};
fetchItem('MLB1341706310');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
