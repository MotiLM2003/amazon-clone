import { buffer } from 'micro';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log('fulfiling order');

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: 'test',
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log('SUCCESS ');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    console.log(' payload', payload);
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log('event', event);
    } catch (err) {
      console.log('error', err);
      return res.status(400).send('webhook error');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fulfillOrder(session)
        .then(() => {
          res.status(200);
        })
        .catch((err) => res.status(400).send('error'));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
