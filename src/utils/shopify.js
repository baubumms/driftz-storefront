import { locale } from 'svelte-i18n';
import {  get  } from 'svelte/store';
import { validateEnv } from './env';


const API_ENDPOINT = import.meta.env.VITE_SHOPIFY_API_ENDPOINT;
validateEnv(API_ENDPOINT, 'VITE_SHOPIFY_API_ENDPOINT');
const STOREFRONT_API_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
validateEnv(STOREFRONT_API_TOKEN, 'VITE_SHOPIFY_STOREFRONT_API_TOKEN');


export async function shopifyFetch({ query, variables }) {
  try {
    const langCode = get(locale);
    console.log(langCode)
    const payload = { query, variables: {...variables, locale: langCode.toUpperCase()} };

    const result = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN,
        'Accept-Language': langCode,
      },
      body: JSON.stringify(payload)
    });
    
    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}

export async function getAllProducts() {
  return shopifyFetch({
    query: `{
      products(sortKey: TITLE, first: 100) {
          edges{
            node {
                id
                handle
                availableForSale
                title
                description
                descriptionHtml
                options {
                    id
                    name
                    values
                }
                priceRange {
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                variants(first: 250) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        node {
                            id
                            title
                            sku
                            availableForSale
                            requiresShipping
                            selectedOptions {
                                name
                                value
                            }
                            priceV2 {
                                amount
                                currencyCode
                            }
                            compareAtPriceV2 {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
                images(first: 20) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        node {
                        originalSrc
                        altText
                        width
                        height
                        }
                    }
                }
            }
        }
      }
    }`
  });
}

export async function getAllCollections() {
  return shopifyFetch({
    query: `{
        collections(first: 100) {
             edges {
                node {
                    title
                    handle
                    products(
                        first: 100,
                        sortKey: TITLE

                    ) {
                        edges{
                            node {
                                id
                                handle
                                availableForSale
                                title
                                description
                                descriptionHtml
                                options {
                                    id
                                    name
                                    values
                                }
                                priceRange {
                                    maxVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                variants(first: 250) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            id
                                            title
                                            sku
                                            availableForSale
                                            requiresShipping
                                            selectedOptions {
                                                name
                                                value
                                            }
                                            priceV2 {
                                                amount
                                                currencyCode
                                            }
                                            compareAtPriceV2 {
                                                amount
                                                currencyCode
                                            }
                                        }
                                    }
                                }
                                images(first: 20) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            originalSrc
                                            altText
                                            width
                                            height
                                        }
                                    }
                                }
                                shortTitle: metafield(namespace: "custom", key: "short_title") {
                                  value
                                }
                            }
                        }
                    }
                }
            }
        }
    }`
  });
}

export async function loadCart(cartId) {
  return shopifyFetch({
    query: `
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
              estimatedCost {
                  totalAmount {
                  amount
                  }
              }
              lines(first: 100) {
                  edges {
                  node {
                      id
                      quantity
                      estimatedCost {
                      subtotalAmount {
                          amount
                          currencyCode
                      }
                      totalAmount {
                          amount
                          currencyCode
                      }
                      }
                      merchandise {
                      ... on ProductVariant {
                          id
                          title
                          product {
                              images(first: 1) {
                                  edges {
                                    node {
                                      originalSrc
                                      altText
                                      width
                                      height
                                    }
                                  }
                                }
                              title
                          }
                      }
                      }
                  }
                  }
              }
            }
        }
      `,
    variables: { cartId }
  });
}

export async function getProduct(handle) {
  return shopifyFetch({
    query: ` 
        query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
                id
                handle
                availableForSale
                title
                description
                descriptionHtml
                options {
                id
                name
                values
                }
                priceRange {
                maxVariantPrice {
                    amount
                    currencyCode
                }
                minVariantPrice {
                    amount
                    currencyCode
                }
                }
                variants(first: 250) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                    id
                    title
                    sku
                    availableForSale
                    requiresShipping
                    selectedOptions {
                        name
                        value
                    }
                    priceV2 {
                        amount
                        currencyCode
                    }
                    compareAtPriceV2 {
                        amount
                        currencyCode
                    }
                    }
                }
                }
                images(first: 20) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                    originalSrc
                    altText
                    width
                    height
                    }
                }
                }
                highlights: metafield(namespace:"custom", key:"highlights"){
                  value
                }
                quantityUnitSingle: metafield(namespace:"custom", key:"quantity_unit_single"){
                  value
                }
                quantityUnitMultiple: metafield(namespace:"custom", key:"quantity_unit_multiple"){
                  value
                }
            }
        }
    `,
    variables: {
      handle
    }
  });
}

export async function getAllArticles() {
  return shopifyFetch({
    query: `{
              articles(first: 50) {
                nodes {
                  id
                  title
                  handle
                  contentHtml
                  content
                  image {
                    id
                    width
                    height
                    url
                  }
                  seo {
                    title
                    description
                  }
                  tags
                  authorName: metafield(namespace: "custom", key: "authorName") {
                    type
                    value
                  }
                  authorPicture: metafield(namespace: "custom", key: "authorPicture") {
                    type
                    value
                  }
                  authorBio: metafield(namespace: "custom", key: "authorBio") {
                    type
                    value
                  }
                }
              }
            }`
  });
}

export async function createCart() {
  return shopifyFetch({
    query: `
      mutation calculateCart($lineItems: [CartLineInput!]) {
        cartCreate(input: { lines: $lineItems }) {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
    variables: {}
  });
}

export async function updateCart({ cartId, lineId, variantId, quantity }) {
  return shopifyFetch({
    query: `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId: cartId,
      lines: [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity: quantity
        }
      ]
    }
  });
}

export async function addToCart({ cartId, variantId }) {
  return shopifyFetch({
    query: `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,

    variables: {
      cartId: cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity: 1
        }
      ]
    }
  });
}

export async function generateCheckout(lines) {
  return shopifyFetch({
    query: `
      mutation createCheckout($locale: LanguageCode!, $lines: [CheckoutLineItemInput!]) @inContext(language: $locale) {
        checkoutCreate(
          input: {
            lineItems: $lines
          }
        ) {
          checkout {
            webUrl
          }
        }
      }
    `,
    variables: {
      lines
    }
  });
}

export const getCheckoutUrl = (cartId) => new Promise((resolve, reject) => {
  loadCart(cartId).then(res => {
    const lines = res.body.data.cart.lines.edges.map(function (item) {
      return {variantId: item.node.merchandise.id, quantity: item.node.quantity};
    });

    generateCheckout(lines).then(res => {
      if(res.status) {
        resolve(res.body.data.checkoutCreate.checkout.webUrl);
      }else {
        reject(res);
      }
    });
  });
});
