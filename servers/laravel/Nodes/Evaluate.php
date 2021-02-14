<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\Node;
use DataStory\Parameters\String_;
use DataStory\Parameters\Textarea;

class Evaluate extends Node
{
    const SHORT_DESCRIPTION  = 'Run arbitary PHP code. You may use the variable: $feature';

    const CATEGORY = Workflow::class;

    public static function parameters($data = [])
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
                $this->getParameter('code')->value
            );
            return $feature;
        });

        $this->output(
            $features
        );
    }
}