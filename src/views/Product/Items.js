import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PopupAction from './PopupAction';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
// import Title from './title';
import Title from '../Auth/Title';

function Products() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [titleAction, setTitleAction] = useState("");
    const [refetch, setRefetch] = useState(false); // State for triggering data refetch


    useEffect(() => {
        getProducts();
    }, [refetch]);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error({ error });
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            setRefetch(prev => !prev); // Trigger refetch by toggling refetch state
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditProduct = (product) => {
        setProduct(product);
        setShowPopup(true);
        setTitleAction("Edit");
    };

    const handleAddProduct = () => {
        setProduct(null); // Reset product state for adding new product
        setShowPopup(true);
        setTitleAction("Add");
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='wrap' style={{ width: '82vw', marginTop: '500px'}}>
            <Title />
            <div className="addButton">
                <Button variant="contained" onClick={handleAddProduct}>Add</Button>
            </div>
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Date Created</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={`/detail/${product.id}`}>{product.id}</Link>
                                </TableCell>
                                <TableCell align="right">{product.name}</TableCell>
                                <TableCell align="right">{format(new Date(product.due_date), 'dd-MM-yyyy')}</TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="right"><img src={product.image} alt={product.image} width="100" /></TableCell>
                                <TableCell align="right">
                                    <Button style={{ marginRight: '10px' }} variant="outlined" onClick={() => handleEditProduct(product)}><i className="fa fa-edit" ></i></Button>
                                    <Button style={{ marginRight: '10px' }} variant="outlined" onClick={() => handleDeleteProduct(product.id)}><i className="material-icons">delete</i></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {showPopup && (
                <PopupAction
                    showPopup={showPopup}
                    product={product}
                    setProducts={setProducts}
                    titleAction={titleAction}
                    handleClosePopup={handleClosePopup}
                    setRefetch={setRefetch} // Pass setRefetch function to update refetch state
                    getProducts={getProducts}
                />
            )}
        </div>
    );
}

export default Products;
