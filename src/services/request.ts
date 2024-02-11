const baseUrl = import.meta.env.VITE_APP_URL + '/api/';

export async function makeApiRequest<V>(
  uri: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  data?: unknown,
): Promise<V> {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(baseUrl + uri, options);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`HTTP error: status ${response.status}`);
    }
  } catch (error) {
    console.error('API request failed', error);
    throw error;
  }
}
