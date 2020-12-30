<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\NodeModel;
use DataStory\Parameters\Number;
use DataStory\Parameters\String_;

class CreateJSON extends NodeModel
{
    const CATEGORY = Workflow::class;

    const IN_PORTS = [];    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('CreateJSON'),
            Number::make('json')->default('[{"foo": "bar"}]'),
        ];
    }

    public function run()
    {
        $this->output(
            collect(
                json_decode($this->getParameter('json'))
            )
        );
    }
}