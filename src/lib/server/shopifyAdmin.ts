import { validateEnv } from '$lib/env';
import { shopifyFetch } from '$lib/shopifyApi';
import { ADMIN_API_TOKEN } from '$lib/server/constants';
import { SHOPIFY_STORE_NAME } from '$lib/constants';

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
