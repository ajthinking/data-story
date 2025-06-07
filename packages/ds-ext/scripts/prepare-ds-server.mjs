import 'zx/globals';
import { copyDist } from './ds-server-utils.mjs';

process.env.FORCE_COLOR = '1';


await copyDist();
