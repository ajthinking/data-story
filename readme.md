# DataStory
⚡ Process builder ⚡ Visual coding ⚡ ETL ⚡ Laravel + React ⚡ Alpha in development ⚡

<img src="https://user-images.githubusercontent.com/3457668/102698183-c32de280-423b-11eb-9bb2-cdda6187094c.png">

## Installation
```
composer require ajthinking/data-story
php artisan vendor:publish --provider="DataStory\DataStoryServiceProvider"
```

That's it! Go to the workbench at `/datastory`.

## Screencast
Coming soon

## Configuration
Coming soon

## Create custom node
Run the command
```bash
php artisan story:node NewEpicNode
```

To generate a node boilerplate:

```php
<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;

class NewEpicNode extends NodeModel
{
    public function run()
    {
        $items = $this->input();
        
        // your code goes here

        $this->output($items);
    }
}
```

After refreshing the page the `NewEpicNode` node is available in the story workbench.

## DataStory concepts A-Z

* Story
* Workbench
* Node
* Control
* Inspector
* Feature
* Invoker
* Creator
* Writer
* Collection
* Import

## Available nodes
* Creator
* Eloquent<Model>
* Pass
* Cloner
* Inspector

## License
MIT
