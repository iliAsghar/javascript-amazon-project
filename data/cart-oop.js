function Cart(localStorageKey){
  const cart = {
    cartItems: undefined,
  
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    
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
    },
  
    saveCartToStorage(){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems))
    },
  
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
    },
  
    removeFromCart(id){
      let newCart = this.cartItems.filter((item) => {
        return item.productId !== id
      })
      this.cartItems = newCart;
  
      this.saveCartToStorage();
    },
  
    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
    
      this.cartItems.forEach(item => {
        if(item.productId === productId){
          matchingItem = item;
        }
      })
    
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveCartToStorage();
    },
  
    getTotalCartQuantity(){
      let totalQuantity = 0;
      this.cartItems.forEach(item => {
        totalQuantity += item.quantity;
      });
      return totalQuantity;
    }
  };

  return cart;
};

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);