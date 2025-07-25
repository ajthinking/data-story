import { InMemoryObserverStorage, ObserverStorage } from '@data-story/core';
import { getWorkingDirConfig, WorkingDirDsServerConfig } from '../server/getWorkingDirConfig';
import { DuckDBStorage } from './duckDBStorage';
import path from 'path';
import fs from 'fs';
import { JsonObserverStorage } from './jsonObserverStorage';

export const createStorage = (): ObserverStorage => {
  const config = getWorkingDirConfig();
  if (config.storage === 'JSON') {
    const filePath = createDataStoryJSONPath({ config, diagramId: `storage-json-${Date.now()}` });
    return new JsonObserverStorage(filePath);
  } else if (config.storage === 'DUCK_DB') {
    const dbPath = createDataStoryDBPath({ config });
    return new DuckDBStorage(dbPath);
  }
  return new InMemoryObserverStorage('todo-diagramId');
};

const createDataStoryDBPath = ({ config }: { config: WorkingDirDsServerConfig; }): string => {
  const datastoryDir = path.join(config.workingDir, '.datastory');
  if (!fs.existsSync(datastoryDir)) {
    fs.mkdirSync(datastoryDir);
  }
  const dbPath = path.join(datastoryDir, 'execution.db');
  return dbPath;
};

const createDataStoryJSONPath = ({ config, diagramId }: { config: WorkingDirDsServerConfig; diagramId: string }): string => {
  const datastoryDir = path.join(
    config.workingDir,
    '.datastory',
    'storage',
    diagramId,
  );
  if (!fs.existsSync(datastoryDir)) {
    fs.mkdirSync(datastoryDir);
  }
  const filePath = path.join(datastoryDir, 'execution.json');
  return filePath;
};
