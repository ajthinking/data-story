import * as vscode from 'vscode';

/**
 * Gets the extension configuration
 * @returns The extension configuration
 */
export function getDsExtConfig(): DsExtConfig {
  const config = vscode.workspace.getConfiguration('ds-ext');

  return {
    additionalDsServerCliArgs: config.get<string[]>('additionalDsServerCliArgs', []),
    dsServerPort: config.get<number>('dsServerPort', 3300),
    useExternalServer: config.get<boolean>('useExternalServer', false),
  };
}

export interface DsExtConfig {
  /**
   * Additional arguments to pass to the ds-server process
   */
  additionalDsServerCliArgs?: string[];

  /**
   * The port to use for the DataStory server
   */
  dsServerPort: number;

  /**
   * Whether to use the external process DataStory server
   * @default true
   * @todo
   */
  useExternalServer?: boolean
}
