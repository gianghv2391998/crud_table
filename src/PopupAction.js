import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function PopupAction({ titleAction, showPopup, handleClosePopup, product, setProducts, setRefetch }) {
    const [editingProduct, setEditingProduct] = useState(product);
    const [checkPreview, setCheckPreview] = useState(false);

    useEffect(() => {
        setEditingProduct(product);
    }, [product]);

    const handleSave = async () => {
        try {
            if (titleAction === "Edit") {
                await axios.put(`http://127.0.0.1:5000/products/${editingProduct.id}`, editingProduct);
            } else {
                const newProduct = { ...editingProduct }; // Create a new object to avoid mutating state
                const response = await axios.post('http://127.0.0.1:5000/products', newProduct);
                newProduct.id = response.data.id; // Assign the new ID received from the server
                setProducts(prevProducts => [...prevProducts, newProduct]);
            }
            setRefetch(prev => !prev); // Trigger refetch in Products component
        } catch (error) {
            console.error(error);
        }
        handleClosePopup();
    };

    const handlePreview = () => {
        setCheckPreview(true);
    };

    return (
        <div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <Typography variant="h3" gutterBottom>
                            {titleAction}
                        </Typography>
                        <br /><br />
                        <TextField
                            id="outlined-name"
                            label="Name"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={editingProduct?.name || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        />
                        <br /><br />
                        <TextField
                            id="outlined-due-date"
                            label="Due Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={editingProduct?.due_date ? format(new Date(editingProduct.due_date), 'yyyy-MM-dd') : ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, due_date: e.target.value })}
                        />
                        <br /><br />
                        <TextField
                            id="outlined-price"
                            label="Price"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={editingProduct?.price || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        />
                        <br /><br />
                        <TextField
                            id="outlined-image-url"
                            label="Image URL"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={editingProduct?.image || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        />

                        <br /><br />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button variant="contained" onClick={handlePreview} style={{ marginRight: '10px' }}>Preview</Button>
                            {checkPreview && editingProduct?.image && (
                                <img src={editingProduct.image} alt="Preview" width="100" />
                            )}
                        </div>
                        <br /><br />
                        <Button variant="contained" onClick={handleSave} style={{ marginRight: '10%' }}>Save</Button>
                        <Button variant="contained" onClick={handleClosePopup}>Cancel</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopupAction;
