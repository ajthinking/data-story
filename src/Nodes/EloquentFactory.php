<?php

namespace DataStory\Nodes;

use DataStory\Node;
use DataStory\Categories\Factory;
use DataStory\Nodes\Factories\EloquentNodeFactory;
use DataStory\Parameters\String_;

class EloquentFactory extends Node
{
    const FACTORY = EloquentNodeFactory::class;

    const CATEGORY = Factory::class;    

    const SHORT_DESCRIPTION  = 'For each input feature create a Eloquent Model';

    public static function describe(array $variation = [])
    {        
        $description = parent::describe($variation);
        $description->name = $variation['shortModel'] . 'Factory';
        $description->summary = $variation['shortModel'] . '::factory()';
        
        return $description;
    }

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default('EloquentFactory'),
            String_::make('model')->default('App\Models\User'),
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