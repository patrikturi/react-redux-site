import config from "../config";


const HOSTNAME = config.apiUrl;
const AUTH_API_V1 = 'api/auth/v1';

const COMMON_HEADERS: Partial<RequestInit> = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
};

export const register = async (data: object): Promise<Response | undefined> => {
    try {
        return await fetch(`${HOSTNAME}/${AUTH_API_V1}/register/`, {
            ...COMMON_HEADERS,
            method: 'POST',
            body: JSON.stringify(data)
        });
    } catch(e) {
        return undefined;
    }
}

export const authCheck = (): Promise<Response> => {
    return fetch(`${HOSTNAME}/${AUTH_API_V1}/check/`, {
        ...COMMON_HEADERS,
        method: 'GET',
    });
}

export const login = async (data: object): Promise<Response | undefined> => {
    try {
        return await fetch(`${HOSTNAME}/${AUTH_API_V1}/login/`, {
            ...COMMON_HEADERS,
            method: 'POST',
            body: JSON.stringify(data)
        });
    } catch(e) {
        return undefined;
    }
}

export const logout = (): Promise<Response> => {
    return fetch(`${HOSTNAME}/${AUTH_API_V1}/logout/`, {
        ...COMMON_HEADERS,
        method: 'POST',
    });
}
