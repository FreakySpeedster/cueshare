'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchPosts = async () => {
            console.log(session?.user.id);
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setMyPosts(data);
        }
        if (session?.user.id) {
            fetchPosts();
        }
    }, []);
    const handleEdit = async (post) => {
        router.push(`/edit-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this post?');
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const filteredPosts = myPosts.filter((p) => p._id !== post._id);
                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
            <Profile
                name="My"
                desc={`Hey ${session?.user.name}, here are your posts!`}
                data={myPosts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
    )
}

export default MyProfile;