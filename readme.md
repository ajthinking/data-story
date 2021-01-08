# DataStory

⚡ Visual coding ⚡ Process builder ⚡ Data driven design ⚡ ETL ⚡ Laravel + React ⚡ Alpha in development ⚡

<img src="https://user-images.githubusercontent.com/3457668/102698183-c32de280-423b-11eb-9bb2-cdda6187094c.png">

![tests](https://github.com/ajthinking/data-story/workflows/tests/badge.svg)
![version](https://img.shields.io/packagist/v/ajthinking/data-story?color=blue)

## What the heck is this :smile:
DataStory provides a workbench for designing data processes. A flow of nodes defines operations such as Read - Create - Transform - Inspect - Write. Some use cases include:

* Allow non coders to visually design data flows in context of your Laravel application. The flow can be executed and saved for future use.
* Quickly query, filter and transform models and view them in separated tables.

> More features/use cases to be announced shortly.

## Installation
```
composer require ajthinking/data-story
php artisan vendor:publish --provider="DataStory\DataStoryServiceProvider"
```

That's it! Go to the workbench at `/datastory`.

## Screencast
https://www.youtube.com/watch?v=IAV39TRr1gk

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
    | Dev mode
    |--------------------------------------------------------------------------
    |
    | Indicate if you are currently developing on the package
    |
    */
    'dev-mode' => env('DATASTORY_DEV_MODE', false),

    /*
    |--------------------------------------------------------------------------
    | Default Nodes
    |--------------------------------------------------------------------------
    |
    | These nodes will be available in the story workbench
    |
    */    
    'nodes' => [
        DataStory\Nodes\AddAttribute::class,
        DataStory\Nodes\Cloner::class,
        DataStory\Nodes\Create::class,
        DataStory\Nodes\CreateJSON::class,
        DataStory\Nodes\EloquentQuery::class,
        DataStory\Nodes\Evaluate::class,
        DataStory\Nodes\Filter::class,
        DataStory\Nodes\Inspect::class,
        DataStory\Nodes\Map::class,
        DataStory\Nodes\Pass::class,
    ],
];
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

## Contributing

Clone this repo
```bash
git clone git@github.com:ajthinking/data-story.git data-story
```
In the same level as `data-story` dir, create a host/container app
```bash
laravel new dsh1
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

Optionally, in `data-story` root create a `.env` and set `DATASTORY_DEV_MODE=true`. This will tell webpack/mix to to copy assets into the host app so you dont have to republish when touching JS. Currently, this only works if you named the host app `dsh1`.

In `data-story`, run
```
yarn && yarn watch
```

Run testsuite in `data-story`
```
composer install
./vendor/bin/phpunit tests
```

Go to `dsh1.test/datastory` to test out your changes :rocket:

## License
MIT
