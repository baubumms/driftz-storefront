import { locale } from 'svelte-i18n';
import { get } from 'svelte/store';

export async function shopifyFetch(
  endpoint: string,
  tokens: { admin?: string; storefront?: string },
  params: { query: string; variables: Record<string, any> }
) {
  console.log(endpoint, tokens);

  if ((!tokens.storefront && !tokens.admin) || (tokens.admin && tokens.storefront)) {
    throw new Error('Missing one valid token for shopifyFetch or both are set');
  }

  try {
    const langCode = get(locale);
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
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}
