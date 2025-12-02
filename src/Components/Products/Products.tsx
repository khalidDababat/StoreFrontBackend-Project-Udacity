import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton,
    Chip,
    Container,
    CircularProgress,
    Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchInput from '../SearchInput/SearchInput';
import UpdateProduct from '../UpdateProduct/UpdateProduct';

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
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = () => {
        navigate('/createProduct');
    };

    const deleteProduct = async (id: string) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this product?'
        );
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
                    },
                }
            );

            if (!res.ok) {
                throw new Error('failed delete product');
            }

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
        <Container maxWidth="xl">
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >
                <SearchInput />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addProduct}
                    sx={{ borderRadius: 2 }}
                >
                    Add Product
                </Button>
            </Stack>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : products.length > 0 ? (
                <Grid container spacing={3}>
                    {products.map((item) => (
                        <Grid
                            key={item.id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={
                                        item.image
                                            ? `${process.env.REACT_APP_BACKEND_UR}${item.image}`
                                            : 'https://via.placeholder.com/200'
                                    }
                                    alt={item.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                            noWrap
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="primary.main"
                                            fontWeight="bold"
                                        >
                                            ${item.price}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={item.category}
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}
                                    >
                                        {item.description ||
                                            'No description available.'}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{ justifyContent: 'flex-end', p: 2 }}
                                >
                                    <IconButton
                                        color="primary"
                                        onClick={() => handelUpdate(item)}
                                        aria-label="edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => deleteProduct(item.id)}
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        No products found.
                    </Typography>
                </Box>
            )}

            {showModel && selectProduct && (
                <UpdateProduct
                    product={selectProduct}
                    onClose={handelCloseModel}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </Container>
    );
};

export default Products;
