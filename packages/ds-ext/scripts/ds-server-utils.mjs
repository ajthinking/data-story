import { chalk, echo, fs, path } from 'zx';

const rootDir = path.join(__dirname, '../../../');
const mkPkgPath = (pkg) => path.join(rootDir, 'packages', pkg);

export const DS_SERVER_MIN_JS_IN = mkPkgPath('nodejs/dist/ds-server.min.js');
export const DS_SERVER_MIN_JS_OUT = mkPkgPath('ds-ext/install-scripts/ds-server.min.js');
export async function copyDist() {
    await fs.copy(
        DS_SERVER_MIN_JS_IN,
        DS_SERVER_MIN_JS_OUT);
    echo(chalk.green('Copied ds-server.min.js'));
}
