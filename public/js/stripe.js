/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe('pk_test_51MP9cMANPUw3UQO4sUmJmHumQF3yOr90gLJCfIMY8ZbHizWXEIxNBanrMa9PcKlXJ60e0VPy5D5JsB3Lgh7dbLUs00DGRYuLMW');

export const bookTour = async tourId => {
    try {
         // 1) Get checkout session from endpoint
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

        // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        showAlert('error', err);
    }

}