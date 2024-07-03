export let cart = JSON.parse(localStorage.getItem('cart')) || []

function saveCartToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}

export function addToCart(Id){
  let matchingItem;

  cart.forEach(item => {
    if(item.productId === Id){
      matchingItem = item
    }
  })

  if(matchingItem){
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: Id,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveCartToStorage();
}

export function removeFromCart(id){
  let newCart = cart.filter((item) => {
    return item.productId !== id
  })
  cart = newCart
  saveCartToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach(item => {
    if(item.productId === productId){
      matchingItem = item;
    }
  })

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveCartToStorage();
}