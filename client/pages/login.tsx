import React, { useState } from 'react';
import Textfeild from '../components/Textfeild';
import Numberfeild from '../components/Numberfeild';
import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';
import { useMutation } from '@apollo/client';
import { GET_OTP_MUTATION } from '../apollo/mutations';
import router from 'next/router';

const login = () => {
  const [getOtp, { data, error, loading }] = useMutation(GET_OTP_MUTATION);
  const { message, setMessage, setShowAlert, showAlert } = useAlert();
  const [status, setStatus] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [inputValue, setInputValue] = useState({
    phone: {
      value: '',
      countryCode: '',
    },
    email: '',
  });

  const emailInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      email: e.target.value,
      phone: {
        value: '',
        countryCode: '',
      },
    });
  };

  const phoneInputHandler = (value: string, country: any) => {
    setInputValue({
      email: '',
      phone: {
        value: `+${value}`,
        countryCode: country.countryCode,
      },
    });
  };

  const toggleHandler = () => {
    setShowEmailInput((prevState) => !prevState);
  };

  const handleOtpProcess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendingMedium =
      inputValue.email !== ''
        ? inputValue.email
        : JSON.stringify(inputValue.phone);

    setStatus(`Sending OTP to ${sendingMedium} ...`);

    if (inputValue.email === '' && inputValue.phone.value === '') {
      setShowAlert(true);
      setMessage({
        text: 'Enter email or phone input',
        variant: 'danger',
      });
      setStatus('');
      return;
    }

    getOtp({
      variables: {
        emailOrPhone: sendingMedium,
      },
      onError: (err) => {
        console.error(err);
      },
    })
      .then((res) => {
        setStatus('OTP sent. Redirecting...');
        router.push('/otp');
      })
      .catch((err) => {
        setStatus('');
        setShowAlert(true);
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
          variant={message.variant}
          message={message.text}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
      <br />
      {status && <div className='flex justify-center'>{status}</div>}
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
    </>
  );
};

export default login;
