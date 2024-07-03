import { cart, getTotalCartQuantity } from "../../data/cart.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js"
import { formatCurrency } from "../utils/money.js";

let $ = document;

let paymentSummaryContainer = $.querySelector('.js-payment-summary')
export function renderPaymentSummary(){
  const itemsCostCents = calculateItemsCost();
  const shippingCostCents = calculateShippingCost();
  const preTaxTotalCents = itemsCostCents + shippingCostCents;
  const taxCents = preTaxTotalCents * 0.1;
  const totalCents = preTaxTotalCents + taxCents

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${getTotalCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(itemsCostCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingCostCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(preTaxTotalCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `

  paymentSummaryContainer.innerHTML = paymentSummaryHTML
}

function calculateItemsCost(){
  let totalItemsCost = 0;
  cart.forEach((cartItem) => {
    const {priceCents} = getProduct(cartItem.productId)
    totalItemsCost += priceCents * cartItem.quantity
  })

  return totalItemsCost;
}

function calculateShippingCost(){
  let totalShippingcost = 0;
  cart.forEach((cartItem) => {
    const {priceCents} = getDeliveryOption(cartItem.deliveryOptionId);
    totalShippingcost += priceCents
  })
  return totalShippingcost;
}