export let cart = [
  {
    productId: '36c64692-677f-4f58-b5ec-0dc2cf109e27',
    quantity: 1 
  },
  {
    productId: 'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
    quantity: 3
  }
];

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
      quantity: 1
    });
  }
}

export function removeFromCart(id){
  let newCart = cart.filter((item) => {
    return item.productId !== id
  })
  cart = newCart
}