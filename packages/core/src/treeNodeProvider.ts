import { Application } from './Application';
import { ServiceProvider } from './types/ServiceProvider';

/**
 * Register nodes from the application tree
 */
export const treeNodeProvider: ServiceProvider = {
  boot: (app: Application) => {
    const treeManager = app.getTreeManager()
    const path = treeManager.rootPath

    // getTree returns a promise - register needs to be async!
    // const tree = treeManager.getTree({ path })
  },
}