"use client";

import { useState } from 'react';

interface ApiData {
  message: string;
  time: number;
}

interface TestApiClientProps {
  initialData: ApiData;
}

export default function TestApiClient({ initialData }: TestApiClientProps) {
  const [data, setData] = useState<ApiData>(initialData);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/test');
      const newData = await res.json();
      setData(newData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">服务端预取数据:</h3>
        <pre className="text-sm bg-white p-2 rounded border">
          {JSON.stringify(initialData, null, 2)}
        </pre>
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2 text-green-800">客户端实时数据:</h3>
        <pre className="text-sm bg-white p-2 rounded border mb-3">
          {JSON.stringify(data, null, 2)}
        </pre>
        
        <button
          onClick={refreshData}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '刷新中...' : '刷新数据'}
        </button>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">数据对比:</h3>
        <p className="text-sm">
          时间差: {data.time - initialData.time}ms
        </p>
        <p className="text-sm">
          数据是否相同: {data.time === initialData.time ? '是' : '否'}
        </p>
      </div>
    </div>
  );
}
