import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Alla Inlägg</h1>
            <input
                type="text"
                placeholder="Sök inlägg..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                        <h2>{post.title}</h2>
                        </Link>
                        <p>{post.content}</p>
                        <small>Datum: {post.datePosted ? new Date(post.datePosted).toLocaleDateString() : "Okänt datum"}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostsPage;

