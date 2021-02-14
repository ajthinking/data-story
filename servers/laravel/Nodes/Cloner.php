<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\Node;
use DataStory\Parameters\AttributeName;
use DataStory\Parameters\Number;
use DataStory\Parameters\String_;

class Cloner extends Node
{
    const SHORT_DESCRIPTION  = 'Make X enumerated copies of each feature';

    const CATEGORY = Workflow::class;

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default('Clone'),
            Number::make('number_of_clones')->default(10),
            String_::make('clone_id_attribute')->default('clone_id'),
            Number::make('clone_id_attribute_start_value')->default(0),
        ];
    }

    public function run()
    {
        $features = $this->input()->map(function($original) {
            return is_object($original)
                ? $this->cloneObject($original) // Copy and attach metadata
                : $this->clonePrimitive($original); // Only copy
        })->flatten(1);

        $this->output($features);
    }

    public function cloneObject($original)
    {
        return collect()->times(
            $this->getParameter('number_of_clones')->value,
            function($index) use($original) {
                $clone = clone $original;
                $cloneIdAttribute = $this->getParameter('clone_id_attribute')->value;
                $clone->$cloneIdAttribute = $index - 1 + $this->getParameter('clone_id_attribute_start_value')->value; 
                return $clone;
            }
        );        
    }

    public function clonePrimitive($original)
    {
        return collect()->times(
                $this->getParameter('number_of_clones')->value,
                fn() => $original
            );
    }
}