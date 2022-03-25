require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('test if fetchProduts is a function', async () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('test if calls fetchProducts', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('test if fetchProducts calls the right endPoint', async () => {
    const apiUrl ="https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(apiUrl); 
  })
  it('test if fetchProducts called with ("computador") is equal to computadorSearch', async () => {
    const response= await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  })
  it('test if fetchProducts without arguments throw the right error', async () => {
    const response= await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});
