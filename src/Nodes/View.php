<?php

namespace DataStory\Nodes;

use DataStory\Categories\Laravel;
use DataStory\NodeModel;
use DataStory\Parameters\String_;

class View extends NodeModel
{
    const CATEGORY = Laravel::class;

    const OUT_PORTS = [];    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('View'),
            String_::make('view')->default('welcome'),
        ];
    }

    public function run()
    {
        $view = view($this->getParameter('view'));
        
        $this->diagram()->setResult($view);
    }
}