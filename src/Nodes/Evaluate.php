<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\NodeModel;
use DataStory\Parameters\String_;
use DataStory\Parameters\Textarea;

class Evaluate extends NodeModel
{
    const CATEGORY = Workflow::class;

    public static function describeParameters($data = [])
    {
        return [
            Textarea::make('node_name')->default('Evaluate'),
            String_::make('code')->default('null;'),
        ];
    }

    public function run()
    {
        $features = $this->input();

        $features = $features->map(function($feature) {
            eval(
                $this->getParameter('code')
            );
            return $feature;
        });

        $this->output(
            $features
        );
    }
}