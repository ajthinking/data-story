<?php

namespace DataStory\Nodes;

use DataStory\Categories\Laravel;
use DataStory\Node;
use DataStory\Parameters\String_;

class Route extends Node
{
    const SHORT_DESCRIPTION  = 'Create a GET Route';

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
            collect([(object) request()->all()])
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