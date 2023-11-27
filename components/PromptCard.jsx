'use client';
import { set } from 'mongoose';
import Image from 'next/image';
import { useState } from 'react';


const PromptCard = (post, handleTagClick) => {
  let { prompt } = post;
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(''), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between">
        <Image 
          src={prompt.createdBy.image}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className='flex flex-col'>
          <h3 className='font-satoshi font-semibold text-gray-400'>{prompt.createdBy.username}</h3>
          <p className='font-inter text-sm text-gray-500'>{prompt.createdBy.email}</p>
        </div>
        <div className='copy_btn' onClick={() => handleCopy()}>
        <Image
          src={copied === prompt.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          width={12}
          height={12}
        />
      </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-300'>{prompt.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
        {prompt.tag}
      </p>
      
    </div>
  );
}

export default PromptCard;