<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;
use DataStory\Parameters\String_;

class EloquentFactory extends NodeModel
{
    const SHORT_DESCRIPTION  = 'For each input feature create a Eloquent Model';

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default('EloquentFactory'),
            String_::make('model'),
        ];
    }

    public function run()
    {
        $model = $this->getParameter('model');
        
        $this->output(
            $this->input()->map(function($feature) use($model) {
                return $model::factory()->count(1)->create(
                    (array) $feature
                );
            })
        );
    }
}