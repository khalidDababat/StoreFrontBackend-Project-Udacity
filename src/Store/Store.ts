import { configureStore } from '@reduxjs/toolkit'; 

import productsSlice from './features/productsSlice'; 
//import cartSlice from './features/cartSlice';

 export  const store = configureStore({ 
    reducer: { 
        products: productsSlice, 
       
    },
}); 

export default store; 


