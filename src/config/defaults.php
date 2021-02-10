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
        DataStory\Nodes\AddAttribute::class,
        DataStory\Nodes\Cloner::class,
        DataStory\Nodes\Create::class,
        DataStory\Nodes\CreateJSON::class,
        DataStory\Nodes\CreateSheet::class,
        DataStory\Nodes\EloquentFactory::class,
        DataStory\Nodes\EloquentQuery::class,
        DataStory\Nodes\Evaluate::class,
        DataStory\Nodes\Filter::class,
        DataStory\Nodes\Inspect::class,
        DataStory\Nodes\Map::class,
        DataStory\Nodes\Pass::class,
        DataStory\Nodes\PortMap::class,
        DataStory\Nodes\Ray::class,
        DataStory\Nodes\ReturnJSON::class,
        DataStory\Nodes\Route::class,
        DataStory\Nodes\Terminate::class,
        DataStory\Nodes\View::class,        
    ],
];