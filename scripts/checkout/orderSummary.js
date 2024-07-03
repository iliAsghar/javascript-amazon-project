let $ = document

import {cart, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {removeFromCart} from '../../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.11/esm/index.js';

const cartContainer = $.querySelector('.js-cart-container')

export function renderOrderSummary(){
  let cartSummaryHTML = ''
  cart.forEach(cartItem => {
    const productId = cartItem.productId;
    let matchingProduct = products.find(item => {
      return item.id === productId
    })
    const deliveryOptionId = cartItem.deliveryOptionId;
    
    let deliveryOption;

    deliveryOption = deliveryOptions.find((option) => {
      return option.id === deliveryOptionId
    })

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    ).format('dddd, MMMM D')


    cartSummaryHTML += `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-btn" data-item-id="${matchingProduct.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-btn" data-item-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
    `
  })
  cartContainer.innerHTML = cartSummaryHTML

  $.querySelectorAll('.js-delete-btn').forEach(button => {
    button.addEventListener('click',() => {
      let targetItemId = button.dataset.itemId
      removeFromCart(targetItemId);
      renderOrderSummary();
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click',() => {
      const {productId,deliveryOptionId} = element.dataset
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
    })
  })
}

function deliveryOptionsHTML(matchingProduct,cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    ).format('dddd, MMMM D')

    const priceString = deliveryOption.priceCents === 0 
      ? 'FREE' 
      : `$${formatCurrency(deliveryOption.priceCents)} -`

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId

    html += `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio"
        ${isChecked ? 'checked': ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${deliveryDate}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
    `
  })
  return html;
}