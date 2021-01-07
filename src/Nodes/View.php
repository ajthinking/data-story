<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\NodeModel;
use DataStory\Parameters\String_;

class View extends NodeModel
{
    const CATEGORY = Workflow::class;

    const OUT_PORTS = [];    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('View'),
        ];
    }

    public function run()
    {
        //
    }

    public function returns()
    {
        //
    }
}