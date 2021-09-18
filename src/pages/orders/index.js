import React from 'react';
import Header from '../../components/Header';
import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import db from '../../../firebase';
const Orders = ({ orders }) => {
  const [session] = useSession();

  return (
    <div className='orders'>
      <Header />
      <main className='header max-w-screen-lg mx-auto p-10'>
        <h1 className='text-4xl border-b mb-2 pb-1 border-yellow-400 '>
          Your orders:
        </h1>
        {session ? (
          <h2>x orders</h2>
        ) : (
          <h2>Please login to view your orders</h2>
        )}

        <div className='mt-5 space-y-4'> </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  //get the users logged in
  const session = await getSession(context);
  if (!session) {
    return;
    {
      props: {
      }
    }
  } else {
    // Firebase

    const stripeOrrders = await db
      .collection('users')
      .doc(session.user.email)
      .collection('orders')
      .orderBy('timestamp', 'desc')
      .get();

    // stripeOrrders
    const orders = await Promise.all(
      stripeOrrders.map(async (order) => ({
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItem(order.id, {
            limit: 100,
          })
        ).data,
      }))
    );

    return {
      props: {
        orders,
      },
    };
  }
}
