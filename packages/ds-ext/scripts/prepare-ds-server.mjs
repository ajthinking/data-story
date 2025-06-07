import { chalk, echo, fs, path } from 'zx';
import 'zx/globals';

process.env.FORCE_COLOR = '1';
const rootDir = path.join(__dirname, '../../../');
const mkPkgPath = (pkg) => path.join(rootDir, 'packages', pkg);

await fs.copy(
    mkPkgPath('nodejs/dist/ds-server.min.js'),
    mkPkgPath('ds-ext/install-scripts/ds-server.min.js'));
echo(chalk.green('Copied ds-server.min.js'));
