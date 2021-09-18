import React from 'react';
import Header from '../../components/Header';
import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import moment from 'moment';
import db from '../../../firebase';
import Order from '../../components/Order';
const Orders = ({ orders }) => {
  const [session] = useSession();

  return (
    <div className='orders'>
      <Header />
      <main className='header max-w-screen-lg mx-auto p-10'>
        <h1 className='text-4xl border-b mb-2 pb-1 border-yellow-400 '>
          Your orders
        </h1>
        {session ? (
          <h2 className='font-bold text-sm'>
            Order(s): {orders ? orders.length : 0}
          </h2>
        ) : (
          <h2>Please login to view your orders</h2>
        )}

        <div className='mt-5 space-y-4'>
          {orders && orders.map((order) => <Order order={order} />)}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  //get the users logged in
  const session = await getSession(context);
  // console.log('session', !session);
  // return;
  if (!session) {
    return {
      props: {},
    };
  } else {
    // Firebase

    const stripeOrders = await db
      .collection('users')
      .doc(session.user.email)
      .collection('orders')
      .orderBy('timestamp', 'desc')
      .get();

    console.log('stripeOrders', stripeOrders);
    // stripeOrrders
    const orders = await Promise.all(
      stripeOrders.docs.map(async (order) => ({
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id, {
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
