import type { LangCode } from '$types/I18n';
import { Logger } from '$lib/logger';

const logger = new Logger('shopifyApi');

let langCode: LangCode | undefined;

export const initShopifyApi = (code: LangCode) => {
  langCode = code;
};

export async function shopifyFetch(
  endpoint: string,
  tokens: { admin?: string; storefront?: string },
  params: { query: string; variables: Record<string, any> }
) {
  if ((!tokens.storefront && !tokens.admin) || (tokens.admin && tokens.storefront)) {
    throw new Error('Missing one valid token for shopifyFetch or both are set');
  }

  if (!langCode) {
    throw new Error("langCode is not set -> shopifyFetch hasn't been initialized");
  }

  try {
    const payload = {
      query: params.query,
      variables: { ...params.variables, locale: langCode?.toUpperCase() }
    };

    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(tokens.storefront
          ? {
              'X-Shopify-Storefront-Access-Token': tokens.storefront
            }
          : { 'X-Shopify-Access-Token': tokens.admin ?? '' }),
        'Accept-Language': langCode ?? ''
      },
      body: JSON.stringify(payload)
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    logger.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}
