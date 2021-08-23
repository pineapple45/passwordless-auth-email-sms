import React, { useState } from 'react';
import Textfeild from '../components/Textfeild';

const otp = () => {
  const [inputValue, setInputValue] = useState('');
  const otpInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className='p-20 flex justify-center'>
      <form
        className='bg-white shadow-md rounded sm:px-4 px-8 pt-6 pb-8 mb-4 md:w-1/3 flex flex-col'
        onSubmit={handleLogin}
      >
        <div className='mb-4'>
          <div>
            <label className='block text-grey-darker text-sm font-bold mb-2'>
              OTP
            </label>
            <Textfeild
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              placeholder='email'
              onChange={otpInputHandler}
              value={inputValue}
              args={{ type: 'text', id: 'otp' }}
            />
          </div>
        </div>

        <div>
          <button
            className='bg-black border-2 text-white py-2 px-4 rounded'
            type='submit'
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default otp;
