// 返回 JSON 数据的 Next.js API 路由
import { NextResponse } from 'next/server';

export async function GET() {
  // 模拟一些处理时间
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({ 
    message: 'Hello from /api/test', 
    time: Date.now(),
    serverTime: new Date().toISOString(),
    randomId: Math.random().toString(36).substr(2, 9)
  });
}
