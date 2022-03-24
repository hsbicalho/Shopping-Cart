const fetchProducts = async (query) => {
  const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
