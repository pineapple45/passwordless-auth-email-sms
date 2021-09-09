import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../apollo/queries';
import { LOGOUT_MUTATION } from '../apollo/mutations';

const clientUrl = process.env.NEXT_PUBLIC_URL;

const Navbar = () => {
  const router = useRouter();
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.replace('http://localhost:3000');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className='flex items-center justify-between flex-wrap bg-green-700 p-6'>
      <div
        className='flex it  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
ems-center flex-shrink-0 text-white mr-6'
      >
        <svg
          className='fill-current h-8 w-8 mr-2'
          width='54'
          height='54'
          viewBox='0 0 54 54'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z' />
        </svg>
        <span>
          <Link href='/'>Tailwind css</Link>
        </span>
      </div>
      <div className='block lg:hidden'>
        <button className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'>
          <svg
            className='fill-current h-3 w-3'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
      </div>
      <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
        <div className='text-sm lg:flex-grow text-white font-bold'>
          <Link href='/protected-page'>Frameworks</Link>
        </div>
        <div>
          {data && data.currentUser && (
            <span className='text-white font-bold px-5'>
              <Link href='/profile'>{data.currentUser.username}</Link>
            </span>
          )}
          {data && data.currentUser ? (
            <a
              className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-gray-800 mt-4 lg:mt-0'
              onClick={handleLogout}
            >
              Logout
            </a>
          ) : (
            <a
              className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-gray-800 mt-4 lg:mt-0'
              onClick={() => router.push('/login')}
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
