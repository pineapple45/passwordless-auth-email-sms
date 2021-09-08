import React, { useState } from 'react';
import Alert from '../components/Alert';
import useAlert from '../hooks/useAlert';
import Numberfeild from '../components/Numberfeild';
import Textfeild from '../components/Textfeild';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE_MUTATION } from '../apollo/mutations';
import { CURRENT_USER_QUERY } from '../apollo/queries';
import {
  WithAuthComponent,
  WithAuthServerSideProps,
} from '../authentication/WithAuthServerSide';

const Profile = ({ user }: any) => {
  const { showAlert, setShowAlert, message, setMessage } = useAlert();
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    refetchQueries: [CURRENT_USER_QUERY],
  });

  const [inputValue, setInputValue] = useState({
    username: user && user.username ? user.username : '',
    email: user && user.email ? user.email : '',
    phone: user && user.phone ? user.phone : '',
  });

  const usernameInputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue({
      ...inputValue,
      username: e.target.value,
    });
  };

  const emailInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      email: e.target.value,
    });
  };
  const phoneInputChangeHandler = (value: string, country: any) => {
    setInputValue({
      ...inputValue,
      phone: `+${value}`,
    });
  };

  const updateProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfile({
      variables: {
        id: user._id,
        ...inputValue,
      },
    })
      .then((res) => {
        setShowAlert(true);
        setMessage({
          text: res.data.updateProfile,
          variant: 'success',
        });
      })
      .catch((err) => {
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
      <div className='p-20 flex justify-center'>
        <form className='mb-4' onSubmit={updateProfileHandler}>
          <div>
            <label
              className='block text-grey-darker text-sm font-bold mb-2'
              htmlFor='username'
            >
              USERNAME
            </label>
            <Textfeild
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              placeholder='username'
              name='username'
              onChange={usernameInputChangeHandler}
              value={inputValue.username}
              args={{ type: 'text', id: 'username' }}
            />
          </div>
          <br />
          <div>
            <label
              className='block text-grey-darker text-sm font-bold mb-2'
              htmlFor='email'
            >
              EMAIL
            </label>
            <Textfeild
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              placeholder='email'
              name='email'
              onChange={emailInputChangeHandler}
              value={inputValue.email}
              args={{ type: 'email', id: 'email' }}
            />
          </div>
          <br />
          <div>
            <label
              className='block text-grey-darker text-sm font-bold mb-2'
              htmlFor='phone'
            >
              PHONE
            </label>
            <Numberfeild
              placeholder='phone'
              name='phone'
              onChange={phoneInputChangeHandler}
              value={inputValue.phone}
            />
          </div>
          <div className='flex items-center justify-between mt-5'>
            <button
              className=' bg-black border-2 text-white py-2 px-4 rounded'
              type='submit'
            >
              UPDATE PROFILE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// export default Profile;

export default WithAuthComponent(Profile);

export const getServerSideProps = WithAuthServerSideProps();
