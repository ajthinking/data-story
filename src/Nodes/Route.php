<?php

namespace DataStory\Nodes;

use DataStory\Categories\Laravel;
use DataStory\NodeModel;
use DataStory\Parameters\String_;

class Route extends NodeModel
{
    const CATEGORY = Laravel::class;

    const IN_PORTS = [];    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('Route'),
            String_::make('route')->default('/datastory/routes/test'),            
        ];
    }

    public function run()
    {
        $this->output(
            collect([request()])
        );
    }

    public function publishes()
    {
        return (object) [
            'type'      => 'get',
            'uri'       => $this->getParameter('route'),
        ];
    }
}