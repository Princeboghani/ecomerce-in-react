const filterReducer = (state,action) =>{
       
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
          let priceArr = action.payload.map((curElem) => curElem.price);
           
    
          // 1way
          // console.log(Math.max.apply(null, priceArr));
    
          // let maxPrice = priceArr.reduce(
          //   (initialVal, curVal) => Math.max(initialVal, curVal),
          //   0
          // );
          // console.log(
          //   "🚀 ~ file: filterReducer.js ~ line 16 ~ filterReducer ~ maxPrice",
          //   maxPrice
          // );
    
          let maxPrice = Math.max(...priceArr);
           
            return{
                ...state,
                filter_products:[...action.payload],
                all_products:[...action.payload],
                filters: { ...state.filters, maxPrice:maxPrice, price: maxPrice },
            }
        
        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            };

        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            };   


        case "GET_SORT_VALUE":
                // let userSortValue = document.getElementById("sort");
                // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
            return {
                ...state,
                sorting_value: action.payload,
            };
          
        case "SORTING_PRODUCTS":
            let newSortData;
                // let tempSortProduct = [...action.payload];
          
            const { filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];
            
            const sortingProducts = (a, b) => {
                  if (sorting_value === "lowest") {
                    return a.price - b.price;
                  }
          
                  if (sorting_value === "highest") {
                    return b.price - a.price;
                  }
          
                  if (sorting_value === "a-z") {
                    return a.name.localeCompare(b.name);
                  }
          
                  if (sorting_value === "z-a") {
                    return b.name.localeCompare(a.name);
                  }
                };
            newSortData = tempSortProduct.sort(sortingProducts); 
            
            return {
                ...state,
                filter_products: newSortData,
              };
        

        case "UPDATE_FILTERS_VALUE":
                const { name, value } = action.payload;
          
            return {
                ...state,
                filters: {
                ...state.filters,
                [name]: value,
                },
            }; 
        
        case "FILTER_PRODUCTS":
                let { all_products } = state;
                let tempFilterProduct = [...all_products];
                 
          
                const { text ,category,company,color,price} = state.filters;
          
                if (text) {
                  tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    
                    return curElem.name.toLowerCase().includes(text);
                  });
                }

                if (category !== "all") {
                    tempFilterProduct = tempFilterProduct.filter((curElem) => {
                      return curElem.category === category;
                    });
                }

                if (company !== "all") {
                    tempFilterProduct = tempFilterProduct.filter((curElem) => {
                      return curElem.company.toLowerCase() === company.toLowerCase();
                    });
                }

                if (color !== "all") {
                  tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.colors.includes(color);
                  });
                }

                if (price === 0) {
                  tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.price===price;
                  });
                }else{
                  tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.price<=price;
                  });
                }
        
        

            return {
                    ...state,
                    filter_products: tempFilterProduct,
                };
        
        case "CLEAR_FILTERS":
            return{
            ...state,
            filters: {
              ...state.filters,
              text: "",
              category: "all",
              company: "all",
              color: "all",
              maxPrice: state.filters.maxPrice,
              price: state.filters.price,
              minPrice: state.filters.minPrice,
            },
          };        
        default:
            return state;
    }
};

export default filterReducer;