export const cart = [{
  productId: '36c64692-677f-4f58-b5ec-0dc2cf109e27',
  quantity: 1 
}];

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