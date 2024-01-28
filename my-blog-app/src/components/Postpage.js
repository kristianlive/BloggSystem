import React, { useState, useEffect } from 'react';

function PostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:8080/api/posts', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setPosts(data);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Alla Inlägg</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>Datum: {post.datePosted ? new Date(post.datePosted).toLocaleDateString() : "Okänt datum"}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostsPage;
