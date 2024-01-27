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
                    <li key={post.id}>{post.title} - {post.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default PostsPage;
