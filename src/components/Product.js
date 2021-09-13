import React, { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
const Product = ({ id, title, price, description, category, image }) => {
  const [rating, setRating] = useState(Math.round(Math.random() * 5));
  const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-5 text-xs italic text-gray-400'>
        {category}
      </p>
      <Image src={image} height='200' width='200' objectFit='contain' />
      <h4 className='my-3'>{title}</h4>

      <div className='flex'>
        {Array(rating)
          .fill()
          .map((_, i) => {
            return <StarIcon key={i} className='h-5 text-yellow-500' />;
          })}
      </div>

      <div className='text-xs mt-2 mb-2 line-clamp-2'>{description}</div>
      <div className='mb-5'>
        <Currency quantity={price} currency='GBP' />
      </div>
      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
          <p className='text-xs text-gray-500'>FREE Next-day delivery</p>
        </div>
      )}

      <button className='mt-auto button'>Add to basket</button>
    </div>
  );
};

export default Product;
