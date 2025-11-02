import React, { useState } from 'react'; 
interface ProductFormProps {
    initialData?: {
        name?: string;
        price?: string;
        description?: string;
        category?: string;
        features?: string;
        image?: string;
    };
    onSubmit: (formData: FormData) => void;
    onCancel: () => void;
    submitLabel?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
    initialData = {},
    onSubmit,
    onCancel,
    submitLabel = 'Save',
}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [nameProduct, setNameProduct] = useState(initialData.name || '');
    const [priceProduct, setPriceProduct] = useState(initialData.price ||'');
    const [description, setDescription] = useState(initialData.name ||'');
    const [category, setCategory] = useState(initialData.name ||'');
    const [features, setFeatures] = useState<string>(initialData.name || '');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nameProduct);
        formData.append('price', priceProduct);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('features', JSON.stringify(features.split(/[,،]/)));

        if (file) formData.append('image', file);
        onSubmit(formData);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="add-product">
                <div className="add-image">
                    <label htmlFor="imageUpload">+ Click to Upload Image</label>
                    {imagePreview && (
                        <div>
                            <img
                                src={imagePreview}
                                alt="preview"
                                className="imagePreview"
                            />
                        </div>
                    )}
                    <input
                        id="imageUpload"
                        accept="image/*"
                        type="file" 
                        className='d-none'
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setFile(file);
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                </div>

                <div className="info d-flex-column ">
                        <label htmlFor="name">Name</label> <br />
                        <input
                            id="name"
                            type="text"
                            required
                            value={nameProduct}
                            onChange={(e) => setNameProduct(e.target.value)}
                        />
                        <br />
                        <label htmlFor="price">price</label> <br />
                        <input
                            id="price"
                            type="text"
                            required
                            value={priceProduct}
                            onChange={(e) => setPriceProduct(e.target.value)}
                        />
                        <br />
                        <label htmlFor="">description</label> <br />
                        <input
                            type="text"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
                        <label htmlFor="">category</label> <br />
                        <input
                            type="text"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <br />
                        <label htmlFor="">features</label> <br />
                        <input
                            type="text"
                            required
                            value={features}
                            onChange={(e) => setFeatures(e.target.value)}
                        />
                        <br />
                    </div>
            </div>

            <div className="btn">
                <button type="submit">{submitLabel}</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
