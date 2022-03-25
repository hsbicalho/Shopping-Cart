const fetchItem = async (id) => {
  const fItem = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const item = await fItem.json();
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
