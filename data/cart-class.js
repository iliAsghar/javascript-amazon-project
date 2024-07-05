class Cart {
  // properties
  cartItems;
  localStorageKey;

  // constructor
  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;

    this.loadFromStorage();
  };
  
  // methods
  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  
  //   if(!this.cartItems){
  //     this.cartItems = [
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
  };

  saveCartToStorage(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems))
  };

  addToCart(Id){
    let matchingItem;
  
    this.cartItems.forEach(item => {
      if(item.productId === Id){
        matchingItem = item
      }
    })
  
    if(matchingItem){
      matchingItem.quantity++;
    } else {
      this.cartItems.push({
        productId: Id,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveCartToStorage();
  };

  removeFromCart(id){
    let newCart = this.cartItems.filter((item) => {
      return item.productId !== id
    })
    this.cartItems = newCart;

    this.saveCartToStorage();
  };

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
    this.cartItems.forEach(item => {
      if(item.productId === productId){
        matchingItem = item;
      }
    })
  
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveCartToStorage();
  };

  getTotalCartQuantity(){
    let totalQuantity = 0;
    this.cartItems.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart)