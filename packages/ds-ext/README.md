## Usage Notes

### To increase the memory limit for the extension

Set [`datastory.additionalDsServerCliArgs`](vscode://settings/datastory.additionalDsServerCliArgs) with the following:
```json
{
    "datastory.additionalDsServerCliArgs": [
        "--max_old_space_size=10240"
    ]
}
```

## Development Notes

1. clone repo
2. in root, also run `yarn` and `yarn build`
3. open repo with VS Code
4. cd <repo_root>/nodejs
5. run `yarn watch:server -- -w <path_to_diagram_files_dir>`
    * e.g. `yarn watch:server -- -w C:\User\s\Doc\Code\test-file`
6. In "Run and Debug" tab, click "Run Extension"
    * This opens a new instance of VS Code
    * The sixth step should follow the fifth step, as the fifth step will start the development server locally; otherwise, VSCode will automatically launch a socket server.
7. With the new instance, open a directory
8. Create a *.ds file (must have a content)

## publish ds-ext to VSCode extension marketplace

* run `yarn build` under `packages/nodejs`
* then `cp packages/nodejs/dist/ds-server.min.js packages/ds-ext/install-scripts/`
* `vsce package --no-yarn --skip-license`
* `vsce publish`