import type { LangCode } from '$types/I18n';
import { validateEnv } from '$lib/env';
import { getAllArticles, getAllCollections, getAllProducts } from '$lib/shopifyStorefront';
import { STOREFRONT_URL } from '$lib/constants';
import { getShopPolicies } from './server/shopifyAdmin';
import { defaultLocale, localeUrlHandles } from '$lib/i18n';

export const generateSiteMap = async (locale: LangCode) => {
  const linkXml = await Promise.all([
    formatedArticles(),
    formatedProducts(),
    formatedTerms(),
    formatedStaticPages(),
    formatedCollections()
  ]).then((blocks) => blocks.join(''));

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${linkXml}
    </urlset>`;

  return body;
};

const formatUrl = (localePath: string, urlEnding: string) =>
  `${STOREFRONT_URL}${localePath}/${urlEnding}`;

const formatedTag = (url: string, updatedAt?: string, priority?: string) => {
  const xml = localeUrlHandles.map(
    (localePath, i) => `
      <url>
        <loc>${formatUrl(localePath, url)}</loc>
        <lastmod>${updatedAt ?? new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${priority ?? 1}</priority>
        ${[...localeUrlHandles].splice(i, 1).map(
          (localePath2) => `
            <xhtml:link
               rel="alternate"
               hreflang="${localePath2 != '' ? localePath2.replace('/', '') : defaultLocale}"
               href="${formatUrl(localePath2, url)}"/>
        `
        )}
      </url>
    `
  );

  return xml.join('');
};

const formatedArticles = async () => {
  const articles = await getAllArticles();

  const xml = articles.body.data.articles.nodes.map((article) =>
    formatedTag(`blog/${article.handle}`, article.publishedAt)
  );

  return xml.join('');
};

const formatedProducts = async () => {
  const products = await getAllProducts();

  const xml = products.body.data.products.edges.map((product) =>
    formatedTag(`products/${product.node.handle}`, product.node.updatedAt)
  );

  return xml.join('');
};

const formatedCollections = async () => {
  const products = await getAllCollections();

  const xml = products.body.data.collections.edges.map((collection) =>
    formatedTag(`search/${collection.node.handle}`, collection.node.updatedAt)
  );

  return xml.join('');
};

const formatedTerms = async () => {
  const terms = await getShopPolicies();

  const xml = terms.body.data.shop.shopPolicies.map((term) =>
    formatedTag(`terms/${term?.type?.toLowerCase()}`, undefined, '0.5')
  );

  return xml.join('');
};

const formatedStaticPages = async () => {
  const urls: string[] = ['', 'blog'];

  const xml = urls.map((url) => formatedTag(url));

  return xml.join('');
};
