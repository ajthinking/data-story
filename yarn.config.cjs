/**
 * This file contains the Yarn constraints for ensuring consistent dependency versions
 * across packages in the monorepo.
 *
 * Reference: https://yarnpkg.com/features/constraints
 */
const { defineConfig } = require('@yarnpkg/types');

module.exports = defineConfig({
  constraints: async ({ Yarn, workspace }) => {
    // For each workspace
    for (const dependent of Yarn.workspaces()) {
      // Skip the root workspace
      if (dependent.cwd === '.') continue;
      // Skip workspaces without a manifest
      if (!dependent.manifest) continue;
      const dependencies = dependent.manifest.dependencies || {};
      const devDependencies = dependent.manifest.devDependencies || {};

      // Process all dependencies that are not in the root package
      for (const [ name, range ] of Object.entries(dependencies)) {
        // Skip workspace dependencies
        if (range.startsWith('workspace:')) continue;

        // Find other workspaces with the same dependency
        for (const other of Yarn.workspaces()) {
          if (!other || !other.manifest) continue;
          if (other.cwd === '.' || other.cwd === dependent.cwd) continue;

          const otherRange = other.manifest.dependencies?.[name];
          if (otherRange && otherRange !== range) {
            dependent.error(
              `Dependency ${name} must have the same version across all workspaces (${range} vs ${otherRange})`,
            );
          }
        }
      }

      // Similar check for devDependencies
      for (const [ name, range ] of Object.entries(devDependencies)) {
        // Skip workspace dependencies
        if (range.startsWith('workspace:')) continue;

        // Find other workspaces with the same devDependency
        for (const other of Yarn.workspaces()) {
          if (!other || !other.manifest) continue;
          if (other.cwd === '.' || other.cwd === dependent.cwd) continue;

          const otherRange = other.manifest.devDependencies?.[name];
          if (otherRange && otherRange !== range) {
            dependent.error(
              `DevDependency ${name} must have the same version across all workspaces (${range} vs ${otherRange})`,
            );
          }
        }
      }
    }
  },
});