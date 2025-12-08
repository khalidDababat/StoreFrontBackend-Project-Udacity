

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
 

export const fetchProduct = createAsyncThunk("products/fetchProducts",
    
    async () => {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_UR}/products`);  
          const data = await res.json(); 
          return data; 
});

export const deleteProduct = createAsyncThunk("products/deleteProduct",
       
    async (productId: string) => { 
             await fetch(`${process.env.REACT_APP_BACKEND_UR}/products/${productId}`, {
            method: "DELETE",
        });
        return productId;
    }); 

const productsSlice  = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: 'idle', 
        loading: false,
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProduct.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
        }) 
        .addCase(fetchProduct.fulfilled, (state, action) => { 
               state.status ='fulfilled';
               state.items = action.payload; 
               state.loading = false;
        }) 
        .addCase(fetchProduct.rejected, (state) => {
            state.status = 'rejected';
            state.loading = false;
           
        })
        
           .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((p: any) => p.id !== action.payload);
            }); 
    }


}); 


export default productsSlice.reducer;
