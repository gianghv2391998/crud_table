import React, { useEffect, useState } from 'react';

function PopupAction({ titleAction, showPopup, closePopup, post, savePost }) {
    const [editingPost, setEditingPost] = useState(post);

    useEffect(() => {
        setEditingPost(post);
    }, [post]);

    const handleSave = () => {
        savePost(editingPost);
        closePopup();
    };

    return (
        <div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>{titleAction}</h3>
                        <label>
                            Company:
                            <input
                                type="text"
                                value={editingPost?.company || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, company: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            Contact:
                            <input
                                type="text"
                                value={editingPost?.contact || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, contact: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            Country:
                            <input
                                type="text"
                                value={editingPost?.country || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, country: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            Image URL:
                            <input
                                type="text"
                                value={editingPost?.image || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                            />
                        </label>
                        <br />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={closePopup}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopupAction;
