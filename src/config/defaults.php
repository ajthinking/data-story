<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Available Nodes
    |--------------------------------------------------------------------------
    |
    | These nodes will be available in the story workbench
    |
    */    
    'nodes' => [
        DataStory\Nodes\EloquentReader::class,
        DataStory\Nodes\Inspector::class,
        DataStory\Nodes\Pass::class,
        DataStory\Nodes\Cloner::class,
    ],

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
    | Custom nodes
    |--------------------------------------------------------------------------
    |
    | Nodes created with php artisan story:node NAME will be put here
    |
    */    
    'custom-nodes-dir' => 'app/DataStory/Nodes',


    /*
    |--------------------------------------------------------------------------
    | Scan custom nodes dir
    |--------------------------------------------------------------------------
    |
    | Automatically scan for custom nodes
    |
    */
    'custom-nodes-scan-dir' => true,

];