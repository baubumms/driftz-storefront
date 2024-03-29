import { writable } from 'svelte/store';
import { loadCart } from '$lib/shopifyStorefront';

export const cartQuantity = writable(0);
export const cart = writable([]);
export const search = writable('');

export const getCartItems = async () => {
  let cartId = JSON.parse(localStorage.getItem('cartId'));

  try {
    const shopifyResponse = await loadCart(cartId);

    let sum = 0;
    shopifyResponse.body?.data?.cart?.lines?.edges?.forEach((d) => {
      sum += d.node.quantity;
    });
    cartQuantity.set(sum);
    return shopifyResponse;
  } catch (error) {
    console.warn(error);
  }
};
