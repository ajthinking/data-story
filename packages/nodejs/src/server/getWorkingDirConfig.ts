import * as fs from 'fs';
import * as path from 'path';

export interface DsServerConfig {
  storage: 'DUCK_DB' | 'IN_MEMORY',
}

const defaultConfig: DsServerConfig = {
  storage: 'IN_MEMORY',
};

export interface WorkingDirDsServerConfig extends DsServerConfig {
  workingDir: string;
}

export function getWorkingDirConfig(): WorkingDirDsServerConfig {
  const workingDir = process.cwd();
  const configPath = path.join(workingDir, 'datastory.config.json');
  console.log('Using config path', configPath);
  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(raw);
    return Object.assign({ workingDir }, defaultConfig, config) as WorkingDirDsServerConfig;
  } catch (err) {
    console.error('Unable to read datastory.config.json', err);
    // Optionally log the error or handle as needed
    return Object.assign({ workingDir }, defaultConfig);
  }
}
