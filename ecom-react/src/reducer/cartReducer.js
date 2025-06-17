const cartReducer = (state,action) =>{

    if(action.type==="ADD_TO_CART"){
        const {id,color,amount,product} = action.payload;
        // console.log("product value",product);
        // console.log(id)
        // console.log(color)
        // console.log(amount)
        
        let existingProduct = state.cart.find(
            (curItem) => curItem.id === id + color
          );
      
          if (existingProduct) {
            let updatedProduct = state.cart.map((curElem) => {
              if (curElem.id === id + color) {
                let newAmount = curElem.amount + amount;
      
                if (newAmount >= curElem.max) {
                  newAmount = curElem.max;
                    
                }
                return {
                  ...curElem,
                  amount: newAmount,
                };
              } else {
                return curElem;
              }
            });
            return {
              ...state,
              cart: updatedProduct,
            };
          } else {
            let cartProduct = {
              id: id + color,
              name: product.name,
              color,
              amount,
              image: product.image[0].url,
              price: product.price,
              max: product.stock,
            };
      
            return {
              ...state,
              cart: [...state.cart, cartProduct],
            };
        }
        
    };
    //incres and decreas 
    if(action.type==="SET_DECREMENT"){
      let updatedProduct = state.cart.map((curElem)=>{
        if(curElem.id===action.payload){
          let decAmount = curElem.amount-1;
          if(decAmount<=1){
            decAmount = 1;
          }
          return{
            ...curElem,
            amount:decAmount,
          };
        }else{
        return curElem;
        };
      });
    return{
      ...state,
      cart:updatedProduct,
    }
    };
  
    if(action.type==="SET_INCREMENT"){
    let updatedProduct = state.cart.map((curElem)=>{
      if(curElem.id===action.payload){
        let iecAmount = curElem.amount+1;
        if(iecAmount>=curElem.max){
          iecAmount = curElem.max;
        }
        return{
          ...curElem,
          amount:iecAmount,
        };
      }else{
      return curElem;
      };
    });
  return{
    ...state,
    cart:updatedProduct,
  }
    };  

  
    if(action.type==="REMOVE_ITEM"){
          let updatedCart = state.cart.filter((curItem) =>{
              return curItem.id !== action.payload
          }           
          );
          console.log(state.cart)
          return{
              ...state,
              cart:updatedCart,
          }
    }

    if(action.type==="CLEAR_CART"){
        return{
            ...state,
            cart:[],
        };
    }

    if(action.type ==="CART_TOTAL_ITEM") {
       let totalProduct = state.cart.reduce((initialval, curElem) => {
        let total = curElem.amount;
        initialval = initialval+total;
        return initialval;
       }, 0);
        
      return{
        ...state,
        total_item:totalProduct,
      };
    }

    if(action.type ==="CART_TOTAL_PRICE") {
      let totalPrice = state.cart.reduce((initialval, curElem) => {
       let { price, amount } = curElem;
       initialval = initialval+(price*amount);
       return initialval;
      }, 0);
       
     return{
       ...state,
       total_price:totalPrice,
     };
   }

    //  if (action.type === "CART_ITEM_PRICE_TOTAL") {
  //   let { total_item, total_price } = state.cart.reduce(
  //     (accum, curElem) => {
  //       let { price, amount } = curElem;

  //       accum.total_item += amount;
  //       accum.total_price += price * amount;

  //       return accum;
  //     },
  //     {
  //       total_item: 0,
  //       total_price: 0,
  //     }
  //   );
  //   return {
  //     ...state,
  //     total_item,
  //     total_price,
  //   };
    // }

  
   return state;
}

export default cartReducer; 