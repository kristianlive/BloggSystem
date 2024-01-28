import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setPost(data);
            }
        };

        fetchPost();
    }, [id]); 

    if (!post) return <div>Laddar...</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>Datum: {new Date(post.datePosted).toLocaleDateString()}</small>
        </div>
    );
}

export default PostDetail;
