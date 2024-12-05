

"use client"
// pages/index.js
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { ArrowLeftOnRectangleIcon, CurrencyRupeeIcon, BoltIcon, ChatBubbleLeftIcon, ExclamationTriangleIcon, HandThumbDownIcon, HandThumbUpIcon, LinkIcon, MoonIcon, PaperAirplaneIcon, PencilSquareIcon, PlusIcon, SignalIcon, SunIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline"
import Link from 'next/link'

export default function Home() {
  const [input, setInput] = useState('');
  //const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState<Array<{ text: string; sender: string }>>([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Here you would typically call an API to get a response
      setTimeout(() => {
        setMessages(messages => [...messages, { text: 'This is a sample response.', sender: 'ai' }]);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <div className='h-screen bg-white text-black flex'>
      <div className='w-64 flex flex-col'>
                <div className='relative flex flex-col flex-grow overflow-y-auto bg-black pt-5'>
                    <button className='flex space-x-1 p-2 hover:bg-gray-700 mx-2 border border-gray-300 rounded text-white'>
                        <PlusIcon className='h-6 w-6' />
                        New Chat
                    </button>
                    <div className='mt-5 flex flex-col text-white'>
                        <Link href="/home" className='flex space-x-2 p-2 hover:bg-black/80 mx-2 bg-gray-700 rounded text-white items-center'>
                            <CurrencyRupeeIcon className='h-6 w-6 text-gray-300' />
                            <p>Payments</p>
                        </Link>
                    </div>
                    <div className='absolute bottom-0 inset-x-0 border-t border-gray-200/50 mx-2 py-6 px-2'>
                        <Link href="/home" className='flex space-x-2 p-2 hover:bg-black/80 mx-2 rounded text-white text-sm items-center'>
                            <UserIcon className='h-5 w-5 text-gray-300' />
                            <p>Profile</p>
                        </Link>
                        <Link href="/home" className='flex space-x-2 p-2 hover:bg-black/80 mx-2 rounded text-white text-sm items-center'>
                            <ArrowLeftOnRectangleIcon className='h-5 w-5 text-gray-300' />
                            <p>Logout</p>
                        </Link>
                    </div>

                </div>
            </div>
      </div>

      <div className={styles.chatSection}>
        <div className={styles.messagesArea}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton}>Send</button>
        </form>
      </div>

    </div>
  );
}