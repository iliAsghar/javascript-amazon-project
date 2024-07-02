export const cart = [];

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