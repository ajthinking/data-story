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

* clone repo
* in root, also run `yarn` and `yarn build`
* open repo with VS Code
* cd <repo_root>/nodejs
* run yarn watch:server -- -p 3300 -w <path_to_diagram_files_dir>
* In "Run and Debug" tab, click "Run Extension"
* This opens a new instance of VS Code
* With the new instance, open a directory
* Create a *.ds file (must have a content)

## Before publish ds-ext to VSCode extension marketplace

* run `yarn build` under `packages/nodejs`
* then `cp packages/nodejs/dist/ds-server.min.js packages/ds-ext/install-scripts/`
