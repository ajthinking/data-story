<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\Node;
use DataStory\Parameters\Number;
use DataStory\Parameters\String_;

class Create extends Node
{
    const SHORT_DESCRIPTION  = 'Create a sequence of enumerated objects';

    const CATEGORY = Workflow::class;

    const IN_PORTS = [];    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('Create'),
            Number::make('number_of_features_to_create')->default(10),
        ];
    }

    public function run()
    {
        $this->output(
            collect()->times($this->getParameter('number_of_features_to_create')->value, function($i) {
                return (object) [
                    'creation_id' => $i
                ];
            })
        );
    }
}