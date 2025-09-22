/**
 * PUBLIC_INTERFACE
 * Production environment configuration for the application. Values are injected via env.
 */
export const environment = {
  production: true,
  API_BASE_URL: (typeof process !== 'undefined' && (process as any).env?.['API_BASE_URL']) || 'https://api.example.com'
};
