# DataStory ⚡ visual programming

![tests](https://github.com/ajthinking/data-story/workflows/tests/badge.svg)
![version](https://img.shields.io/packagist/v/ajthinking/data-story?color=blue)
![proofofconcept](https://img.shields.io/badge/proof%20of%20concept-gold)

DataStory provides a workbench for designing data flow diagrams.


![image](https://user-images.githubusercontent.com/3457668/105969887-07a56d00-6089-11eb-978f-d829d1ce1d1c.png)

<!---

## Installation
```
composer require ajthinking/data-story --dev
php artisan vendor:publish --provider="DataStory\DataStoryServiceProvider"
```

## Examples
A DataStory script can be executed via GUI or as a part of your Laravel apps HTTP lifecycle.

### :bulb: Tinker with data in GUI
![image](https://user-images.githubusercontent.com/3457668/105964532-9d89c980-6082-11eb-95f9-4ffb3c94fb9f.png)
:point_right: Open the workbench at `/datastory`. Click the :heavy_plus_sign: icon and select one of your models. Next, add an Inspector. Press the :arrow_forward: icon to execute the diagram. An Inspect tab will appear in the toolbar where you can review the resulting data.
<hr>

### :bulb: Make a view route
![image](https://user-images.githubusercontent.com/3457668/105965234-75e73100-6083-11eb-8ab2-3858d7e5c990.png)
:point_right: Add a Route node. Double click it and configure the route uri. Next, add a View node and configure the view parameter. Optionally, add ports and connect data the view needs. To publish the route, click the save icon in the toolbar.
<hr>

### :bulb: JSON API routes
![image](https://user-images.githubusercontent.com/3457668/105966254-b4c9b680-6084-11eb-8553-b201f31abea1.png)
:point_right: Use a ReturnJSON node to return the current collection as a HTTP response. As in the view example, you must first save the story to publish the route.
<hr>

### :bulb: Use as artisan command
TODO
<hr>

## Available default nodes
```
AddAttribute,
Cloner,
Create,
CreateJSON,
EloquentFactory,
EloquentQuery,
Evaluate,
Filter,
Inspect,
Map,
Pass,
PortMap,
ReturnJSON,
Route,
Terminate,
View,
```

## Create custom node
Run the command
```bash
php artisan story:node NewEpicNode
```

To generate a node boilerplate:

```php
<?php

namespace App\DataStory\Nodes;

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


## Configuration
You may edit settings in `config/data-story.php` as needed. This is the contents of the published config file:

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Custom nodes
    |--------------------------------------------------------------------------
    |
    | Nodes created with php artisan story:node NAME will be put here
    |
    */    
    'custom-nodes-dir'       => 'app/DataStory/Nodes',
    'custom-nodes-namespace' => 'App\DataStory\Nodes',

    /*
    |--------------------------------------------------------------------------
    | Scan custom nodes dir?
    |--------------------------------------------------------------------------
    |
    | Automatically scan for custom nodes
    |
    */
    'custom-nodes-scan-dir' => true,

    /*
    |--------------------------------------------------------------------------
    | Stories dir
    |--------------------------------------------------------------------------
    |
    | Saved stories will be placed here
    |
    */    
    'stories-dir' => base_path('app/DataStory/stories'),

    /*
    |--------------------------------------------------------------------------
    | Publish story routes
    |--------------------------------------------------------------------------
    |
    | Allow saved stories to publish routes
    |
    */
    'enable-story-routes' => true,

    /*
    |--------------------------------------------------------------------------
    | App models
    |--------------------------------------------------------------------------
    |
    | where to search for app models
    |
    */
    'models-dir'       => base_path('app/Models'),
    'models-namespace' => 'App\\Models\\',

    /*
    |--------------------------------------------------------------------------
    | Default Nodes
    |--------------------------------------------------------------------------
    |
    | These nodes will be available in the story workbench
    |
    */    
    'nodes' => [
        // the default nodes ...
    ],
];
```

## Hotkeys

| Hotkey        | Action           |
| ------------- |:-------------:|
| ALT+D                 | Go to diagram |
| ALT+T                 | Go to inspectors |
| ALT+PLUS              | Add node |
| ALT+R                 | Run diagram |
| SHIFT+click on link   | Select link |


## Contributing

Clone this repo
```bash
git clone git@github.com:ajthinking/data-story.git data-story
```
In the same level as `data-story` dir, create a host/container app
```bash
laravel new dsh1
```
Now we have something like:
```
~/Code
+---data-story
+---dsh1
```

Add this to the host apps `composer.json`
```json
    "repositories": [
        {
            "type": "path",
            "url": "/PATH/TO/YOUR/CODE/data-story"
        }
    ], 
```

Install `data-story` in host app with dev flag:
```
composer require ajthinking/data-story @dev
```

Optionally, in `data-story` root create a `.env` and set `MIX_DATASTORY_DEV_MODE_AUTO_PUBLISH=true`. This will tell webpack/mix to to copy assets into the host app so you dont have to republish when touching JS. Currently, this only works if you named the host app `dsh1`. If you skip this step manually publish assets with command:
```
php artisan vendor:publish --provider="DataStory\DataStoryServiceProvider"
```

Then, in `data-story`, run
```
yarn && yarn watch
```

Run testsuite in `data-story`
```
composer install
./vendor/bin/phpunit tests
```

Go to `dsh1.test/datastory` to test out your changes :rocket:

## This is a Proof of Concept
:hammer_and_wrench: Some things might be broken. Feel free to ask question or make an Issue.


-->

## Live JS Demo (WIP)
A JS server implementation is deployed at https://ajthinking.github.io/data-story/

## Acknowledgements
Thanks to Dylan & [projectstorm/react-diagrams](https://github.com/projectstorm/react-diagrams)

## License
MIT