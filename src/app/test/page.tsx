import TestApiClient from '@/components/TestApiClient';
import { apiRequest } from '@/lib/api';

export default async function Test() {
  // 服务端组件：使用封装的 API 请求方法预取数据
  try {
    const initialData = await apiRequest('/api/test');
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600 mb-8">Test API 调用示例</h1>
        
        <div className="max-w-4xl">
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <h2 className="text-xl font-semibold mb-2">架构说明:</h2>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• <strong>服务端组件</strong>: 页面加载时预取初始数据，SEO友好</li>
              <li>• <strong>客户端组件</strong>: 处理用户交互，实时刷新数据</li>
              <li>• <strong>混合架构</strong>: 结合两者优势，提供最佳用户体验</li>
              <li>• <strong>环境适配</strong>: 自动适配不同环境的 API 地址</li>
            </ul>
          </div>

          <TestApiClient initialData={initialData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-red-600 mb-8">Test API 调用示例</h1>
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <h2 className="text-xl font-semibold mb-2 text-red-800">请求失败:</h2>
          <p className="text-red-600">{error instanceof Error ? error.message : '未知错误'}</p>
        </div>
      </div>
    );
  }
}
