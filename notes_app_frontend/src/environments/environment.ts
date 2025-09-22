/**
 * PUBLIC_INTERFACE
 * Environment configuration for the application. Values should be supplied via .env at build/runtime.
 * API_BASE_URL should be provided by the orchestrator and mapped to the final deployment URL.
 */
export const environment = {
  production: false,
  // Request to orchestrator: Please provide API_BASE_URL in the .env; defaults to placeholder if not set.
  API_BASE_URL: (typeof process !== 'undefined' && (process as any).env?.['API_BASE_URL']) || 'http://localhost:4001/api'
};
