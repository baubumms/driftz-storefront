import { generateSiteMap } from '$lib/sitemap';

export async function GET({ params }) {
  const headers = {
    'Cache-Control': `max-age=0, s-max-age=${600}`,
    'Content-Type': 'application/xml'
  };

  const body = await generateSiteMap(params.lang);

  return new Response(body, { headers });
}
