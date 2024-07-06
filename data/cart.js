export let cart;

loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [];

//   if(!cart){
//     cart = [
//       {
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 2,
//         deliveryOptionId: '1'
//       },
//       {
//         productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
//         quantity: 1,
//         deliveryOptionId: '2'
//       }
//     ];
//     saveCartToStorage();
//   }
}

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

export function getTotalCartQuantity(){
  let totalQuantity = 0;
  cart.forEach(item => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}


export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    console.log(xhr.response);
    fun();
  })
  
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
};