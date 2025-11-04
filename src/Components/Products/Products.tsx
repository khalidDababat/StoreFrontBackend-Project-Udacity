import React, { Fragment, useEffect, useState } from 'react';
import './Products.scss';
import Sidebar from '../Sidebar/Sidebar';
import SearchInput from '../SearchInput/SearchInput';
import { useNavigate } from 'react-router';
import UpdateProduct from '../UpdateProduct/UpdateProduct';
import HeaderUser from '../Headers/HeaderUser';

type Product = {
    id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    image?: string;
    features?: string;
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModel, setShowModel] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const token = localStorage.getItem('token'); // not secure
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_UR}/products`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const productsData = await response.json();
            setProducts(productsData);
        } catch (err) {
            console.log('Failed to fetch products', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = () => {
        navigate('/createProduct');
    };

    const deleteProduct = async (id: string) => {
        const confirmDelete = window.confirm('هل انت متأكد من حذف المنتج ؟');
        if (!confirmDelete) {
            return;
        }
        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_UR}/products/${id}`,
                {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: `Bearer ${token}`
                    },
                }
            );

            if (!res.ok) {
                throw new Error('failed delete product');
            }

            // Update product on UI
            setProducts((item) => item.filter((product) => product.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handelUpdate = (p: Product) => {
        setSelectedProduct(p);
        setShowModel(true);
    };

    const handelCloseModel = () => {
        setShowModel(false);
        setSelectedProduct(null);
    };
    const handleUpdateSuccess = () => {
        fetchProducts();
        handelCloseModel();
    };

    return (
        <Fragment>
            <div className="container-products">
                <Sidebar />
                <div className="content">
                    <HeaderUser title="Products" />
                    <div className="btns">
                        <SearchInput />
                        <button type="button" onClick={addProduct}>
                            Add Product
                        </button>
                    </div>

                    <div className="product-info">
                        <table
                            border={2}
                            className="table  table-striped  table-bordered"
                        >
                            <thead>
                                <tr className="table-primary">
                                    <th>product number</th>
                                    <th>product name</th>
                                    <th>Product Price</th>
                                    <th>product Description</th>
                                    <th>product category</th>
                                    <th>product features</th>
                                    <th>product image</th>
                                    <th>Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.description ?? ''}</td>
                                            <td>{item.category}</td>
                                            <td>{item.features ?? ''}</td>
                                            <td>
                                                {item.image && (
                                                    <img
                                                        className="image-product"
                                                        src={`${process.env.REACT_APP_BACKEND_UR}${item.image}`}
                                                        alt="not Found"
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <div className="details">
                                                    <button
                                                        onClick={() =>
                                                            handelUpdate(item)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        id="del"
                                                        onClick={() =>
                                                            deleteProduct(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <td colSpan={8} style={{ color: 'gray' }}>
                                        لايوجد منتجات مضافة
                                    </td>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {showModel && selectProduct && (
                        <UpdateProduct
                            product={selectProduct}
                            onClose={handelCloseModel}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Products;
