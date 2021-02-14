<?php

namespace DataStory\Nodes;

use DataStory\Node;
use DataStory\Parameters\String_;

class Map extends Node
{
    const SHORT_DESCRIPTION  = 'Map into property';

    public static function parameters($variation = [])
    {
        return [
            String_::make('node_name')->default('Map'),
            String_::make('property')->default(''),
        ];
    }

    public function run()
    {
        $this->output(
            $this->input()->map->{
                $this->getParameter('property')->value
            }
        );
    }
}