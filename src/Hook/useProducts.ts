import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "../Store/features/productsSlice"; 

export const useProducts = () => {
         
     const dispatch = useDispatch<any>();
     const { items: products, loading } = useSelector((state: any) => state.products); 
    
     useEffect(() => {
        dispatch(fetchProduct());
     }, [dispatch]);  

    

        return { products, loading};
} ;