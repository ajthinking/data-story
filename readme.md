# DataStory ⚡ visual programming

![tests](https://github.com/ajthinking/data-story/workflows/tests/badge.svg)
![proofofconcept](https://img.shields.io/badge/proof%20of%20concept-gold)
<!--![version](https://img.shields.io/packagist/v/ajthinking/data-story?color=blue)-->


DataStory provides a workbench for designing data flow diagrams.


![image](https://user-images.githubusercontent.com/3457668/105969887-07a56d00-6089-11eb-978f-d829d1ce1d1c.png)

## Live Demo
Deployed at https://ajthinking.github.io/data-story/

## Development Installation
* Clone it
* Run `yarn && yarn watch`
* Serve app from `public/index.html`

## Available default nodes
```
Comment,
Create,
CreateAttribute,
CreateGrid,
CreateSequence,
CreateJSON,
DeleteRepositories,
DownloadJSON,
Evaluate,
Flatten,
HTTPRequest,
Inspect,
Log,
Map,
OutputProvider,
RegExpFilter,
Repositories,
Sleep,
```

## Add node
You may run the following command
```
yarn add-node YourNodeName
```

This will create new Node- and test files. Then you need to manually register the node in `ServerNodeFactory`.

Run tests with
```
yarn test --watch
```

## Hotkeys (MAC)

| Hotkey        | Action           |
| ------------- |:-------------:|
| ALT+D                 | Go to diagram |
| ALT+T                 | Go to inspectors |
| ALT+PLUS              | Add node |
| ALT+R                 | Run diagram |
| SHIFT+click on link   | Select link |

<hr>

## Acknowledgements
Thanks to Dylan & [projectstorm/react-diagrams](https://github.com/projectstorm/react-diagrams)

## License
MIT