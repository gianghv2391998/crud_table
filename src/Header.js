import React from 'react';
import Button from '@mui/material/Button';

function Header({ name, onEdit, onDelete, onBack }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>{name}</h2>
            <div style={{ marginRight: '70%' }}>
                <Button variant="contained" onClick={onEdit} style={{ marginRight: '10px' }}>Edit</Button>
                <Button variant="contained" onClick={onDelete} style={{ marginLeft: '10px' }}>Delete</Button>
            </div>
            <Button variant="contained" onClick={onBack}>Back</Button>
        </div>
    );
}

export default Header;
