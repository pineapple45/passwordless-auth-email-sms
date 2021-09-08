import React, { useState } from 'react';
import Textfeild from '../components/Textfeild';
import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../apollo/mutations';

const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

const otp = () => {
  const { showAlert, setShowAlert, message, setMessage } = useAlert();
  const [loginUser, { data, error, loading }] = useMutation(LOGIN_MUTATION);
  const [inputValue, setInputValue] = useState('');

  const otpInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser({ variables: { otp: inputValue } })
      .then((res) => {
        window.location.replace(`${clientUrl}`);
      })
      .catch((err) => {
        setMessage({
          text: err.message,
          variant: 'danger',
        });
      });
  };

  return (
    <>
      {message.text && (
        <Alert
          message={message.text}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
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
    </>
  );
};

export default otp;
