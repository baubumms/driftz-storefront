import { validateEnv } from "$utils/env";
import gql from 'graphql-tag';
import { shopifyFetch } from "$lib/graphqlWrapper";

const ADMIN_API_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_API_TOKEN;
validateEnv(ADMIN_API_TOKEN, 'VITE_SHOPIFY_ADMIN_API_TOKEN');

const endpointUrl = `https://${ADMIN_API_TOKEN}.myshopify.com/admin/api/2022-10/graphql.json`;

const adminFetch = async (query: string, variables: Record<string, any>) => {
  return await shopifyFetch(endpointUrl, {admin: ADMIN_API_TOKEN}, {query, variables});
};

gql`{
  shop{
    shopPolicies{
      type
      body
    }
  }
}`