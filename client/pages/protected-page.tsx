import React, { useEffect } from 'react';
import { initializeApollo } from '../apollo/client';
import { LIST_FRAMEWORKS_QUERY } from '../apollo/queries';
import Image from 'next/image';
import {
  WithAuthComponent,
  WithAuthServerSideProps,
} from '../authentication/WithAuthServerSide';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

type FrameworkType = {
  _id: string;
  name: string;
  url: string;
};

interface FrameworkListProps {
  frameworks: FrameworkType[];
  error: string;
  user: any;
}

const ProtectedPage = ({ frameworks, error, user }: FrameworkListProps) => {
  const { message, setMessage, setShowAlert, showAlert } = useAlert();

  useEffect(() => {
    if (error) {
      setMessage({
        text: error,
        variant: 'danger',
      });
    }
  }, [error]);

  return (
    <div className='bg-green-100 py-14'>
      <h3 className='text-2xl tracking-widest text-green-600 text-center'>
        FRAMEWORKS
      </h3>
      <h1 className='mt-8 text-center text-5xl text-green-600 font-bold'>
        Top Frontend Frameworks
      </h1>
      {error && (
        <Alert
          message={message.text}
          variant={message.variant}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
      <div className='md:flex md:justify-center md:space-x-8 md:px-14'>
        {frameworks.map((framework: FrameworkType) => {
          return (
            <div
              key={framework._id}
              className='md:flex md:justify-center md:space-x-8 md:px-14'
            >
              <div className='mt-16 py-4 px-4 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'>
                <div className='w-sm'>
                  <Image
                    src={framework.url}
                    alt={framework.name}
                    width='850'
                    height='640'
                  />

                  <div className='mt-4 text-green-600 text-center'>
                    <h1 className='text-xl font-bold'>{framework.name}</h1>
                    <p className='mt-4 text-gray-600'>
                      Pretium lectus quam id leo in vitae turpis. Mattis
                      pellentesque id nibh tortor id.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WithAuthComponent(ProtectedPage);

export const getServerSideProps = WithAuthServerSideProps(
  async ({ context, user }: any) => {
    // getServerSideProps function for this specific page
    const client = initializeApollo();
    let error = null;
    let frameworks = { listFrameworks: [] };

    try {
      const { data } = await client.query({
        query: LIST_FRAMEWORKS_QUERY,
        fetchPolicy: 'network-only',
      });

      frameworks = data; // data => { listFrameworks: []}
    } catch (err: any) {
      error = err;
      console.error(err);
    }

    return {
      props: { frameworks: frameworks.listFrameworks, error },
    };
  }
);
