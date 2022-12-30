export const processCookies = (cookie: string) => {
  const cookieObj: Record<string, string> = {};
  cookie.split(';').forEach((cookie) => {
    const [key, value] = cookie.split('=');
    cookieObj[key.trim()] = value;
  });
  return cookieObj;
};
