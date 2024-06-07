import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
                setProduct(response.data);
                setEditingProduct(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleEdit = () => {
        axios.put(`http://127.0.0.1:5000/products/${id}`, editingProduct)
            .then(() => {
                navigate(0);
            })
            .catch(error => console.error(error));
    };

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:5000/products/${id}`)
            .then(() => {
                navigate('/');
            })
            .catch(error => console.error(error));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detail-container">
            <Header
                name={product.name}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onBack={() => navigate(-1)}
            />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginTop: '20px' }}>
                <div style={{ flex: 1 }}>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={editingProduct?.name || ''} disabled
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        fullWidth
                    />

                    <br /><br />
                    <TextField
                        id="outlined-due-date"
                        label="Date Created"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={editingProduct?.due_date ? format(new Date(editingProduct.due_date), 'yyyy-MM-dd') : ''} disabled
                        onChange={(e) => setEditingProduct({ ...editingProduct, due_date: e.target.value })}
                        fullWidth
                    />

                    <br /><br />
                    <TextField
                        id="outlined-price"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={editingProduct?.price || ''} disabled
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        fullWidth
                    />
                    <br /><br />
                    <TextField
                        id="outlined-image-url"
                        label="Image URL"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={editingProduct?.image || ''} disabled
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        fullWidth
                    />
                    <br /><br />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={editingProduct.image} alt="Preview" width="100%" />
                </div>
            </div>
        </div>
    );
}

export default Detail;
