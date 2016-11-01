export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
export const API_BASE_STACKOVERFLOW_URL: string = `http://api.stackexchange.com/2.2/`;
