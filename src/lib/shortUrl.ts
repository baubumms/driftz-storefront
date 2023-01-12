import { error, type RequestEvent } from '@sveltejs/kit';

export const shortUrlResponse = async (
  event: RequestEvent<Partial<Record<string, string>>, string>
) => {
  const url = event.url;
  if (!isShortUrl(url)) {
    return null;
  }

  const handle = getShortUrlHandle(url);
  const safeHandle = handle.split('/').slice(0, 2).join('/');
  const apiUrl = `https://s.baubumms.de/${safeHandle}`;

  const res = await fetch(apiUrl, {
    redirect: 'manual',
    headers: { 'X-Real-IP': event.getClientAddress() },
    cache: 'no-cache'
  });
  let location = res.headers.get('location');

  if (res.status === 302 && location) {
    if (location == 'https://baubumms.de') {
      location = url.origin;
    }

    return new Response(null, {
      status: 302,
      headers: {
        location: location
      }
    });
  } else {
    throw error(404, "Short URL doesn't exist");
  }
};

export const isShortUrl = (url: URL) => {
  return url.pathname.startsWith('/s/');
};

const getShortUrlHandle = (url: URL) => {
  return url.pathname.replace('/s/', '');
};
