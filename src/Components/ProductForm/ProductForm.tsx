import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
    Stack,
    InputAdornment,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

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
    const [priceProduct, setPriceProduct] = useState(initialData.price || '');
    const [description, setDescription] = useState(
        initialData.description || ''
    );
    const [category, setCategory] = useState(initialData.category || '');
    const [features, setFeatures] = useState<string>(
        initialData.features || ''
    );
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (initialData.image) {
            setImagePreview(initialData.image);
        }
    }, [initialData.image]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', nameProduct);
        formData.append('price', priceProduct);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('features', JSON.stringify(features.split(',')));

        if (file) formData.append('image', file);
        onSubmit(formData);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                border: '2px dashed',
                                borderColor: 'divider',
                                borderRadius: 2,
                                p: 2,
                                textAlign: 'center',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover',
                                },
                            }}
                            component="label"
                        >
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                            {imagePreview ? (
                                <Box
                                    component="img"
                                    src={imagePreview}
                                    alt="Preview"
                                    sx={{
                                        width: '100%',
                                        maxHeight: 300,
                                        objectFit: 'contain',
                                        borderRadius: 1,
                                    }}
                                />
                            ) : (
                                <>
                                    <CloudUploadIcon
                                        sx={{
                                            fontSize: 48,
                                            color: 'text.secondary',
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        Click to upload image
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack spacing={3}>
                            <TextField
                                label="Product Name"
                                value={nameProduct}
                                onChange={(e) => setNameProduct(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Price"
                                value={priceProduct}
                                onChange={(e) =>
                                    setPriceProduct(e.target.value)
                                }
                                required
                                fullWidth
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={4}
                                fullWidth
                            />
                            <TextField
                                label="Features (comma separated)"
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                                fullWidth
                                helperText="Example: Spicy, Vegan, Gluten-free"
                            />
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-end"
                        >
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<CancelIcon />}
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<SaveIcon />}
                            >
                                {submitLabel}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default ProductForm;
