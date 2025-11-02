import React from 'react';
import './UpdateProduct.scss';
import HeaderUser from '../Headers/HeaderUser';
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
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: formData,
                }
            );

            if (!res.ok) {
                console.log('failed Update Product');
            }
            onUpdateSuccess();
        } catch (error) {
            console.log('Update failed Product', error);
        }
    };

    return (
        <div className="UpdateProduct-container">
            <div className="content">
                <HeaderUser title="Update Product" />
                <ProductForm
                    initialData={{
                        name: product.name,
                        price: String(product.price),
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
                    submitLabel="Update"
                />
            </div>
        </div>
    );
};

export default UpdateProduct;
