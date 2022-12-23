import { shopifyFetch } from '$lib/shopifyApi';
import { validateEnv } from '$lib/env';

const SHOPIFY_STORE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
validateEnv(SHOPIFY_STORE_NAME, 'VITE_SHOPIFY_STORE_NAME');
const STOREFRONT_API_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
validateEnv(STOREFRONT_API_TOKEN, 'VITE_SHOPIFY_STOREFRONT_API_TOKEN');

const apiEndpoint = `https://${SHOPIFY_STORE_NAME}.myshopify.com/api/2022-10/graphql.json`;

interface IFetchStorefrontProps {
  query: string;
  variables?: Record<string, any>;
}

export const fetchStorefront = ({ query, variables }: IFetchStorefrontProps) =>
  shopifyFetch(apiEndpoint, { storefront: STOREFRONT_API_TOKEN }, { query, variables });

export async function getAllProducts() {
  return fetchStorefront({
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
  return fetchStorefront({
    query: `{
        collections(first: 100) {
             edges {
                node {
                    title
                    handle
                    }
                }
            }
        }`
  });
}

export async function getAllCollectionsWithContent() {
  return fetchStorefront({
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
  return fetchStorefront({
    query: `
        query GetCart($cartId: ID!, $locale: LanguageCode!)  @inContext(language: $locale) {
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
  return fetchStorefront({
    query: ` 
        query getProduct($handle: String!, $locale: LanguageCode!)  @inContext(language: $locale) {
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
  return fetchStorefront({
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
  return fetchStorefront({
    query: `
      mutation calculateCart($lineItems: [CartLineInput!], $locale: LanguageCode!)  @inContext(language: $locale) {
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
  return fetchStorefront({
    query: `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $locale: LanguageCode!)  @inContext(language: $locale) {
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
  return fetchStorefront({
    query: `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!, $locale: LanguageCode!)  @inContext(language: $locale){
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
  return fetchStorefront({
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

export const getCheckoutUrl = (cartId) =>
  new Promise<string>((resolve, reject) => {
    loadCart(cartId).then((res) => {
      const lines = res.body.data.cart.lines.edges.map(function (item) {
        return { variantId: item.node.merchandise.id, quantity: item.node.quantity };
      });

      generateCheckout(lines).then((res) => {
        if (res.status) {
          resolve(res.body.data.checkoutCreate.checkout.webUrl);
        } else {
          reject(res);
        }
      });
    });
  });
