const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://223.130.129.41/api/'
const domainURL = process.env.NEXT_PUBLIC_BASE_URI || '';
const frontEndUrl = process.env.NEXT_PUBLIC_REACT_APP_FRONT_URL || '';
const appMode = process.env.NEXT_PUBLIC_APP_MODE || 'dev';

export { domainURL, baseURL, frontEndUrl, appMode };
