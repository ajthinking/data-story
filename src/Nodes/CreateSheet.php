<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\Node;
use DataStory\Parameters\Sheet;
use DataStory\Parameters\String_;

class CreateSheet extends Node
{
    const SHORT_DESCRIPTION  = 'Create objects from a sheet';

    const IN_PORTS = [];

    const CATEGORY = Workflow::class;    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('CreateSheet'),
            Sheet::make('sheet'),
        ];
    }

    public function run()
    {
        $this->output(
            collect(
                json_decode($this->getParameter('json')->value)
            )
        );
    }
}