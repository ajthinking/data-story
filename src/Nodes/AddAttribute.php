<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\NodeModel;
use DataStory\Parameters\String_;
use DataStory\Support\Data;

class AddAttribute extends NodeModel
{
    const CATEGORY = Workflow::class;

    public static function describeParameters($data = [])
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
            );
        });



        $this->output($features);
    }
}