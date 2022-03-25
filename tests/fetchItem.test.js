require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('test if fetchItem is a function', async () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('test if calls fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('test if fetchItem calls the right endPoint', async () => {
    const url= "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('test if fetchItem called with ("MLB1615760527") is equal to item', async () => {
    const response=  await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  })
  it('test if fetchItem without arguments throw the right error', async () => {
    const response= await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});
