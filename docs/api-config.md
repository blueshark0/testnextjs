# API 地址配置文档

## 环境配置

### 开发环境
- 自动使用 `http://localhost:3000`
- 可通过 `API_BASE_URL` 环境变量覆盖

### 生产环境
- Vercel: 自动使用 `VERCEL_URL`
- 其他平台: 使用 `API_BASE_URL` 或 `NEXTAUTH_URL`
- 客户端: 使用相对路径

## 环境变量配置

创建 `.env.local` 文件：

```bash
# 开发环境
API_BASE_URL=http://localhost:3000

# 生产环境
API_BASE_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
```

## 使用方法

### 服务端组件
```tsx
import { apiRequest } from '@/lib/api';

// 在服务端组件中使用
const data = await apiRequest('/api/test');
```

### 客户端组件
```tsx
import { clientFetch } from '@/lib/api';

// 在客户端组件中使用
const response = await clientFetch('/api/test');
const data = await response.json();
```

## 优势

1. **自动环境检测**: 根据运行环境自动选择合适的 API 地址
2. **部署友好**: 支持 Vercel、Netlify 等主流部署平台
3. **类型安全**: 提供 TypeScript 类型支持
4. **错误处理**: 统一的错误处理机制
5. **配置灵活**: 支持多种环境变量配置方式
