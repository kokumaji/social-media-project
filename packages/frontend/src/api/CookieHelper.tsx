export const getApiToken = (cookies: string) => {
	const cookieJar = getCookieJar(cookies);
	return cookieJar.find(x => x.startsWith("apiToken="))?.replace("apiToken=", "");
};

export const getCookieJar = (cookies: string) => {
	return cookies.split(";");
};
