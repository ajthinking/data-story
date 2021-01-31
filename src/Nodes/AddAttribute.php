<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\Node;
use DataStory\Parameters\String_;
use DataStory\Support\Data;

class AddAttribute extends Node
{
    const SHORT_DESCRIPTION  = 'Add an attribute to each feature';

    const CATEGORY = Workflow::class;

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('AddAttribute'),
            String_::make('attribute_name')->default('_new_attribute'),
            String_::make('attribute_value')->default(''),
        ];
    }

    public function run()
    {
        $features = $this->input()->map(function($feature) {
            return Data::of($feature)->set(
                $this->getParameter('attribute_name'),
                $this->getParameter('attribute_value'),
            )->get();
        });

        $this->output($features);
    }
}