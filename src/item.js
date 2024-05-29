import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Item(refetch) {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, [refetch]);

    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/posts/${id}`);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const editPost = (post) => {
        setEditingPost(post);
        setShowPopup(true);
    };

    const closePopup = () => {
        setEditingPost(null);
        setShowPopup(false);
    };

    const savePost = async () => {
        try {
            await axios.put(`http://localhost:3000/posts/${editingPost.id}`, editingPost);
            setPosts(prevPosts => prevPosts.map(post => (post.id === editingPost.id ? editingPost : post)));
            closePopup();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (posts || []).map((post) => (
                            <tr key={post.id}>
                                <>
                                    <td>{post.id}</td>
                                    <td>{post.company}</td>
                                    <td>{post.contact}</td>
                                    <td>{post.country}</td>
                                    <td><img src={post.image} alt={post.company} width="100" /></td>
                                </>
                                <td>
                                    <button type="button" className="btn btn-warning btn-sm" onClick={() => editPost(post)}><i className="fa fa-edit"></i></button>
                                    <button type="button" onClick={() => deletePost(post.id)} className="btn btn-danger btn-sm"><i className="material-icons">delete</i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Edit</h3>
                        <label>
                            Company:
                            <input type="text" value={editingPost.company} onChange={(e) => setEditingPost({ ...editingPost, company: e.target.value })} />
                        </label>
                        <br></br>
                        <label>
                            Contact:
                            <input type="text" value={editingPost.contact} onChange={(e) => setEditingPost({ ...editingPost, contact: e.target.value })} />
                        </label>
                        <br></br>
                        <label>
                            Country:
                            <input type="text" value={editingPost.country} onChange={(e) => setEditingPost({ ...editingPost, country: e.target.value })} />
                        </label>
                        <br></br>
                        <label>
                            Image URL:
                            <input type="text" value={editingPost.image} onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })} />
                        </label>
                        <br></br>
                        <button onClick={savePost}>Save</button>
                        <button onClick={closePopup}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Item;
