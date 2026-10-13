const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getRequestUrl = (path) => {
  if (!path) {
    return apiBaseUrl;
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedPath.startsWith('/api')) {
    return normalizedPath;
  }

  return `${apiBaseUrl}${normalizedPath}`;
};

const parseResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const apiRequest = async (path, options = {}) => {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  if (requestOptions.body && typeof requestOptions.body !== 'string') {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  const response = await fetch(getRequestUrl(path), requestOptions);
  const payload = await parseResponse(response);

  if (!response.ok) {
    const error = new Error(
      payload?.message || payload?.error || 'Something went wrong while contacting the server.'
    );

    error.status = response.status;
    error.errors = payload?.errors || [];
    error.payload = payload;
    throw error;
  }

  return payload;
};

export const api = {
  get: (path) => apiRequest(path, { method: 'GET' }),
  post: (path, body) =>
    apiRequest(path, {
      method: 'POST',
      body,
    }),
};

export { apiBaseUrl };
