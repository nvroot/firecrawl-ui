import { Configuration } from '../api-client/configuration.js'

const getBaseUrl = () => {
  return localStorage.getItem('firecrawl_base_url') || import.meta.env.VITE_FIRECRAWL_API_BASE_URL || 'https://api.firecrawl.dev/v1'
}

const getApiKey = () => {
  // Retrieves the API key from local storage or environment variables
  return localStorage.getItem('firecrawl_api_key') || import.meta.env.VITE_FIRECRAWL_API_KEY || ''
}

const apiConfig = new Configuration({
  basePath: getBaseUrl(),
  apiKey: getApiKey,
  baseOptions: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
})

// Ajoute dynamiquement le header Authorization si une clé est disponible
const apiKey = getApiKey()
if (apiKey) {
  apiConfig.baseOptions = {
    ...apiConfig.baseOptions,
    headers: {
      ...apiConfig.baseOptions?.headers,
      'Authorization': `Bearer ${apiKey}`
    }
  }
}

export default apiConfig
