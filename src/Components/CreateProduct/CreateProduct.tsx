import React from 'react';
import { useNavigate } from 'react-router';
import { Container, Typography, Box } from '@mui/material';
import ProductForm from '../ProductForm/ProductForm';

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
                alert('create Product failed!');
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
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    Add New Product
                </Typography>
                <ProductForm
                    onSubmit={createNewProduct}
                    onCancel={() => navigate('/products')}
                    submitLabel="Create Product"
                />
            </Box>
        </Container>
    );
};

export default CreateProduct;
