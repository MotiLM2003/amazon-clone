import React from 'react';
import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Header />
      <main className='max-w-screen-lg mx-auto bg-white px-10 pt-3 pb-10'>
        <div className='flex items-center mt-8 mb-4 space-x-2 '>
          <CheckCircleIcon className='w-8 md:w-14 text-green-600' />
          <h1 className='text-lg  md:text-3xl  font-bold md:font-extrabold '>
            Thank you, your order has been confirmed!
          </h1>
        </div>
        <p className='text-black text-xs md:text-sm font-bold '>
          Thank you for shopping with us. We'll send a confirmation once your
          item has shipped, if you would like to check the status of your
          orders(s) please press teh link below
        </p>

        <button
          onClick={() => router.push('/orders/')}
          className='button w-full mt-5 font-bold '
        >
          Go to my orders
        </button>
      </main>
    </div>
  );
};

export default Success;
