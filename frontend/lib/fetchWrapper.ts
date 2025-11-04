import { API_BASE_URL } from './config';

type FetchOptions = RequestInit & {
    skipAuth?: boolean;
};

export async function fetchWrapper(url: string, options: FetchOptions = {}) {
    const { skipAuth = false, ...fetchOptions } = options;
    
    // Adiciona a URL base da API
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    
    // Configura os headers padrão
    fetchOptions.headers = {
        ...fetchOptions.headers,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // Adiciona credentials para CORS
    fetchOptions.credentials = 'include';
    
    if (!skipAuth) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            fetchOptions.headers = {
                ...fetchOptions.headers,
                'Authorization': `Bearer ${token}`
            };
        }
    }

    const response = await fetch(fullUrl, fetchOptions);

    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Sessão expirada');
    }

    if (!response.ok) {
        const bodyText = await response.text().catch(() => '');
        console.error('Erro na requisição:', response.status, response.statusText, bodyText);
        throw new Error(bodyText || 'Erro na requisição');
    }

    return response;
}