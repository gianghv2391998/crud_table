import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupAction from './PopupAction';

function Items({ refetch }) {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [titleAction, setTitleAction] = useState("");

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

    const handleDeletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/posts/${id}`);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditPost = (post) => {
        setPost(post);
        setShowPopup(true);
        setTitleAction("Edit");
    };

    const handleAddPost = () => {
        setPost({}); // Reset post to an empty object for adding new post
        setShowPopup(true);
        setTitleAction("Add");
    };

    const savePost = async (post) => {
        try {
            if (titleAction === "Edit") {
                await axios.put(`http://localhost:3000/posts/${post.id}`, post);
                setPosts(prevPosts => prevPosts.map(p => (p.id === post.id ? post : p)));
            } else {
                const newPost = { ...post, id: (posts.length + 1).toString() }; // Assign a new ID
                await axios.post('http://localhost:3000/posts', newPost);
                setPosts(prevPosts => [...prevPosts, newPost]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const closePopup = () => {
        setPost(null);
        setShowPopup(false);
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
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <>
                                <td>{post.id}</td>
                                <td>{post.company}</td>
                                <td>{post.contact}</td>
                                <td>{post.country}</td>
                                <td><img src={post.image} alt={post.company} width="100" /></td>
                            </>
                            <td>
                                <button type="button" className="btn btn-warning btn-sm" onClick={handleAddPost}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg></button>

                                <button
                                    type="button"
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleEditPost(post)}
                                >
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeletePost(post.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    <i className="material-icons">delete</i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && (
                <PopupAction
                    showPopup={showPopup}
                    titleAction={titleAction}
                    post={post}
                    closePopup={closePopup}
                    savePost={savePost}
                />
            )}
        </div>
    );
}

export default Items;
