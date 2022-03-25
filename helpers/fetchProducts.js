const fetchProducts = async (query) => {
  try {
  const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const results = await products.json();
  return results;
  } catch (error) {
  return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
