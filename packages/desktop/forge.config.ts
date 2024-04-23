import type { ForgeConfig } from '@electron-forge/shared-types';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    name: 'data-story-desktop',
    asar: true,
    icon: './assets/icon.icns',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'data-story-desktop',
        background: './assets/icon.png',
        setupIcon: './assets/icon.icns',
        icon: './assets/icon.icns',
      }
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'data-story-desktop',
        setupIcon: './assets/icon.ico',
        shortcutName: 'data story',
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32'],
      config: {
        name: 'data-story-desktop',
        setupIcon: './assets/icon.ico'
      }
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'ajthinking',
          name: 'data-story'
        },
        prerelease: true
      }
    }
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
      //  https://github.com/electron/forge/blob/main/packages/plugin/webpack/src/WebpackPlugin.ts#L77
      port: 3050,
    }),
  ],
};

export default config;
