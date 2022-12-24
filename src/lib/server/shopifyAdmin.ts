import { validateEnv } from '$lib/env';
import { shopifyFetch } from '$lib/shopifyApi';

const SHOPIFY_STORE_NAME = import.meta.env.VITE_SHOPIFY_STORE_NAME;
validateEnv(SHOPIFY_STORE_NAME, 'VITE_SHOPIFY_STORE_NAME');
const ADMIN_API_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_API_TOKEN;
validateEnv(ADMIN_API_TOKEN, 'VITE_SHOPIFY_ADMIN_API_TOKEN');

const endpointUrl = `https://${SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2022-10/graphql.json`;

interface IAdminFetchProps {
  query: string;
  variables?: Record<string, any>;
}

const adminFetch = async ({ query, variables }: IAdminFetchProps) => {
  return await shopifyFetch(endpointUrl, { admin: ADMIN_API_TOKEN }, { query, variables });
};

export const getShopPolicies = async () => {
  const result = await adminFetch(shopPoliciesQuery);
  console.log('status', result.status);
  return result;
};

export const getShopPoliciesTransalted = async () => {
  const result = await adminFetch(shopPoliciesQueryTranslated);
  return result;
};

const shopPoliciesQuery = {
  query: `{
    shop{
      shopPolicies{
        type
        body
      }
    }
  }`
};

const shopPoliciesQueryTranslated = {
  query: `
  query($locale: String!){
    shop{
      shopPolicies{
        type
        translations (locale: $locale){
          value
        }
      }
    } 
  }`
};
