import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProductForm from '../ProductForm/ProductForm';

interface UpdateProductProps {
    product: any; // ideally your Product type
    onClose: () => void;
    onUpdateSuccess: () => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
    product,
    onClose,
    onUpdateSuccess,
}) => {
    const handelUpdate = async (formData: FormData) => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_UR}/products/${product.id}`,
                {
                    method: 'PUT',
                    body: formData,
                }
            );

            if (!res.ok) {
                console.log('failed Update Product in server');
            } else {
                onUpdateSuccess();
            }
        } catch (error) {
            console.log('Update failed Product', error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" component="div" fontWeight="bold">
                    Update Product
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <ProductForm
                    initialData={{
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        features: Array.isArray(product.features)
                            ? product.features.join(',')
                            : product.features || '',
                        image: product.image
                            ? `${process.env.REACT_APP_BACKEND_UR}${product.image}`
                            : '',
                    }}
                    onSubmit={handelUpdate}
                    onCancel={onClose}
                    submitLabel="Update Product"
                />
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProduct;
