<?php

namespace DataStory\Nodes;

use DataStory\Node;
use DataStory\Parameters\String_;
use Exception;

class Terminate extends Node
{
    const SHORT_DESCRIPTION  = 'Terminate execution by throwing an error';

    const OUT_PORTS = [];    

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default('Terminate'),
            String_::make('message')->default('You are terminated!'),
        ];
    }

    public function run()
    {
        $this->input()->whenNotEmpty(function() {
            throw new Exception(
                $this->getParameter('message')
            );
        });


    }
}