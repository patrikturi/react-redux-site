import { CLIENT_PORT, HTTP_PORT, PROD_API_URL } from "./const";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const getApiUrl = () => {
    const location = window.location;
    if(location.port) {
        return `${location.protocol}//${location.hostname}:${HTTP_PORT}`;
    } else {
        return PROD_API_URL;
    }
}

const config = {
    playUrl: process.env.NODE_ENV === PRODUCTION ? window.location.origin + '/play/' : `${window.location.protocol}//${window.location.hostname}:${CLIENT_PORT}/`,
    apiUrl: getApiUrl(),
    useSentry: process.env.NODE_ENV === PRODUCTION,
};

export default config;
