import React from 'react';
//import './CreateProduct.scss';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router';
import ProductForm from '../ProductForm/ProductForm';
import HeaderUser from '../Headers/HeaderUser';

const CreateProduct = () => {
    const navigate = useNavigate();

    const createNewProduct = async (formData: FormData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_UR}/products`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                alert('not save Product In DataBase ');
            } else {
                navigate('/products');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.log('error ', err);
        }
    };

    return (
        <div className="addProduct-container">
            <Sidebar />
            <div className="content">
                <HeaderUser title="Add Product" />
                <ProductForm
                    onSubmit={createNewProduct}
                    onCancel={() => navigate('/products')}
                    submitLabel="Save"
                />
            </div>
        </div>
    );
};

export default CreateProduct;
