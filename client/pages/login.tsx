import React, { useState } from 'react';
import Textfeild from '../components/Textfeild';
import Numberfeild from '../components/Numberfeild';

const login = () => {
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [inputValue, setInputValue] = useState({
    phone: {
      value: '',
      countryCode: '',
    },
    email: '',
  });

  const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const phoneInputHandler = (value: string, country: any) => {};

  const toggleHandler = () => {
    setShowEmailInput((prevState) => !prevState);
  };

  const handleOtpProcess = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className='p-20 flex justify-center'>
      <div className='bg-white shadow-md rounded sm:px-4 px-8 pt-6 pb-8 mb-4 md:w-1/2 flex flex-col'>
        <form className='mb-4' onSubmit={handleOtpProcess}>
          {showEmailInput ? (
            <div>
              <label className='block text-grey-darker text-sm font-bold mb-2'>
                EMAIL
              </label>
              <Textfeild
                className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                placeholder='email'
                onChange={emailInputHandler}
                value={inputValue.email}
                args={{ type: 'text', id: 'username' }}
              />
            </div>
          ) : (
            <div>
              <label className='block text-grey-darker text-sm font-bold mb-2'>
                PHONE
              </label>
              <Numberfeild
                placeholder='phone'
                onChange={phoneInputHandler}
                value={inputValue.phone.value}
              />
            </div>
          )}

          <br />
          <span
            onClick={toggleHandler}
            className='cursor-pointer hover:text-green-800'
          >
            use {showEmailInput ? 'phone' : 'email'} instead ?
          </span>

          <div className='flex items-center justify-between mt-5'>
            <button
              className='bg-black border-2 text-white py-2 px-4 rounded'
              type='submit'
            >
              GET OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
