import { SidebarWrap } from './sidebarWrap';
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';

export function ConfigSidebar({ setSidebarKey }: { setSidebarKey: (key: string) => void }) {
  const params = useStore(s => s.params);
  const setParams = useStore(s => s.setParams);
  const [json, setJson] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Show params as a raw array
  useEffect(() => {
    setJson(JSON.stringify(params, null, 2));
  }, [params]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) {
        setError('Params must be a JSON array');
        return;
      }
      setError(null);
      setParams(parsed);
      setSidebarKey('');
    } catch (err: any) {
      setError('Invalid JSON: ' + err.message);
    }
  }

  return (
    <SidebarWrap title={'Config'} setShowSidebar={setSidebarKey}>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Global params</label>
          <textarea
            className="w-full border rounded p-2 mb-2 text-sm font-mono"
            rows={6}
            value={json}
            onChange={e => setJson(e.target.value)}
            placeholder='{"key": "value"}'
          />
          {error && (
            <div className="text-red-500 text-xs mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Add Param
          </button>
        </form>
      </div>
    </SidebarWrap>
  );
}
