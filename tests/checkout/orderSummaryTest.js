import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  beforeAll((done) => {
    loadProductsFetch().then(done)
  });

  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-cart-container"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'setItem')

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }
      ]);
    });

    loadFromStorage();
    
    renderOrderSummary();
  });


  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2)

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2')

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1')
  });
  
  it('removes a product', () => {
    document.querySelector(`.js-delete-btn-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(
      cart.length
    ).toEqual(1);

    expect(
      cart[0].productId
    ).toEqual(productId2)
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })

})