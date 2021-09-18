import React from 'react';
import moment from 'moment';
import Currency from 'react-currency-formatter';
import Image from 'next/image';
const Order = (order) => {
  const { id, amount, amountShipping, items, timestamp, images } = order.order;
  console.log(order);
  return (
    <div className='bg-gray-200 p-1'>
      <div className='flex justify-between p-3 items-center'>
        <div className='flex space-x-10'>
          <div className='text-center'>
            <h3 className='text-sm font-bold'>ORDER PLACED</h3>
            <h4>{moment.unix(timestamp).format('DD MMM YYYY')}</h4>
          </div>
          <div className='text-center'>
            <h3 className='text-sm font-bold'>TOTAL</h3>
            <h4>
              <Currency quantity={amount} currency='GBP' />
            </h4>
          </div>
        </div>
        <div>
          <p className='truncate whitespace-nowrap w-0 md:40 lg:w-72'>
            ORDER # {id}
          </p>
          <div className='text-right text-xl text-blue-600'>
            {items.length} Items
          </div>
        </div>
      </div>
      <div className='bg-white p-3 flex gap-4 justify-center items-center'>
        {images.map((image) => {
          return <Image src={image} width={120} height={120} />;
        })}
      </div>
    </div>
  );
};

export default Order;
