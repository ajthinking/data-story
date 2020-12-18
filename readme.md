# DataStory
Alpha in development

![image](https://user-images.githubusercontent.com/3457668/100412714-af94bf00-3075-11eb-9f6b-143fe77e4592.png)

## Installation
This is still just a standard Laravel app

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

