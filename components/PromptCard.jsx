'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const PromptCard = ({prompt, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();


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
          alt='copy icon'
          width={12}
          height={12}
        />
      </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-300'>{prompt.prompt}</p>
      <p className='font-inter text-sm text-blue-500 cursor-pointer hover:text-blue-700' onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
        {prompt.tag}
      </p>
      {session?.user.id === prompt.createdBy._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-700'>
          <p className='font-inter mt-3 text-sm text-gray-300 hover:text-blue-600 cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
         <p className='font-inter mt-3 text-sm text-red-700 hover:text-red-500 cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}

      
    </div>
  );
}

export default PromptCard;