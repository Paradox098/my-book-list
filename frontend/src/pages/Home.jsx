import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className='p-4'
      style={{
        backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/502/672/845/blue-sea-sea-blue-sky-white-clouds-ocean-scenery-wallpaper-preview.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensure the background covers the entire viewport height
      }}
    >
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className={`bg-black-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-white`}
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className={`bg-red-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-white`}
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 text-white'>Welcome to my book list</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-red-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
