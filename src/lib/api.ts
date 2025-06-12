/**
 * API 请求工具类
 * 用于封装不同环境下的接口地址差异
 */

// 获取基础 URL
function getBaseUrl(): string {
  // 1. 优先使用环境变量中的 API_BASE_URL
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }

  // 2. 在 Vercel 等平台上，使用 VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. 在服务端渲染时，使用本地地址
  if (typeof window === 'undefined') {
    // 开发环境
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000';
    }
    // 生产环境，如果没有其他配置，使用当前域名
    return process.env.NEXTAUTH_URL || 'http://localhost:3000';
  }

  // 4. 在客户端，使用相对路径
  return '';
}

/**
 * 构建完整的 API URL
 * @param path API 路径，如 '/api/test'
 * @returns 完整的 URL
 */
export function getApiUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return baseUrl ? `${baseUrl}${cleanPath}` : cleanPath;
}

/**
 * 服务端 fetch 请求封装
 * @param path API 路径
 * @param options fetch 选项
 * @returns Promise<Response>
 */
export async function serverFetch(
  path: string, 
  options: RequestInit = {}
): Promise<Response> {
  const url = getApiUrl(path);
  
  const defaultOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  return fetch(url, { ...defaultOptions, ...options });
}

/**
 * 客户端 fetch 请求封装
 * @param path API 路径
 * @param options fetch 选项
 * @returns Promise<Response>
 */
export async function clientFetch(
  path: string, 
  options: RequestInit = {}
): Promise<Response> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  return fetch(path, { ...defaultOptions, ...options });
}

/**
 * 通用 API 请求方法
 * @param path API 路径
 * @param options 请求选项
 * @returns Promise<T>
 */
export async function apiRequest<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const isServer = typeof window === 'undefined';
  const fetchFn = isServer ? serverFetch : clientFetch;
  
  const response = await fetchFn(path, options);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}
