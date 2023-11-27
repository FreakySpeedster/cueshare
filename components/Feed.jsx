'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard 
                    key={post._id}
                    prompt={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )

}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        console.log(searchText);
    }
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    }, []);
    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for tags or usernames'
                    className='search_input peer'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                />
            </form>
            <PromptCardList 
                data={posts}
                handleTagClick={() => {}}
            />

        </section>
    );
}

export default Feed