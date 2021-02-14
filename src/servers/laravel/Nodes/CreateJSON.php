<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\Node;
use DataStory\Parameters\JSON_;
use DataStory\Parameters\Number;
use DataStory\Parameters\String_;

class CreateJSON extends Node
{
    const SHORT_DESCRIPTION  = 'Create a sequence of objects from a JSON array';

    const CATEGORY = Workflow::class;    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('CreateJSON'),
            JSON_::make('json')->default(static::defaultJson()),
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

    protected static function defaultJson()
    {
        return json_encode([
            [
                'name' => 'Robin Hood'
            ],
            [
                'name' => 'Lady Marian'
            ],
            [
                'name' => 'Little John'
            ],  
            [
                'name' => 'Friar Tuck'
            ],                                    
        ], JSON_PRETTY_PRINT);
    }
}