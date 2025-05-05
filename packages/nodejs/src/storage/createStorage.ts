import { InMemoryObserverStorage, ObserverStorage } from '@data-story/core';
import { getWorkingDirConfig } from '../server/getWorkingDirConfig';
import { DuckDBStorage } from './duckDBStorage';
import path from 'path';
import fs from 'fs';

export const createStorage = (): ObserverStorage => {
  const config = getWorkingDirConfig();
  console.log('Creating storage', config.storage);

  if (config.storage === 'DUCK_DB') {
    const datastoryDir = path.join(
      config.workingDir, '.datastory',
    );
    if (!fs.existsSync(datastoryDir)) {
      fs.mkdirSync(datastoryDir);
    }
    const dbPath = path.join(datastoryDir, 'execution.db');
    console.log('Using DuckDB storage', dbPath);
    return new DuckDBStorage(dbPath);
  }
  console.log('Using in-memory storage');
  return new InMemoryObserverStorage('todo: diagramId');
};
