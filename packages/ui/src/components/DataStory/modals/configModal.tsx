import { shallow } from 'zustand/shallow';
import { Modal } from '../modal'
import { StoreSchema, useStore } from '../store';
import { useEffect, useRef } from 'react';

export const ConfigModal = ({ setShowModal }: {
  setShowModal: (show: boolean) => void
}) => {
  const selector = (state: StoreSchema) => ({
    serverConfig: state.serverConfig,
    setServerConfig: state.setServerConfig,
  });

  const { serverConfig, setServerConfig } = useStore(selector, shallow);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;

    if(type === 'SOCKET') {
      setServerConfig({
        type: 'SOCKET',
        url: 'ws://localhost:3100'
      });
    }

    if(type === 'JS') {
      setServerConfig({
        type: 'JS',
      });
    }
  };

  console.log("aaa", serverConfig, "bbb")

  return (<Modal
    title={"Config"}
    setShowModal={setShowModal}
  >
    <div className="flex flex-col space-y-2">
      This is the config modal!
      <div className="w-full px-4 space-x-2 align-end text-gray-500 text-xs">
        <label>Server</label>
        <select value={serverConfig.type} onChange={handleTypeChange}>
          <option value="SOCKET">WebSocket</option>
          <option value="JS">JS</option>
        </select>
      </div>
    </div>
  </Modal>)
}