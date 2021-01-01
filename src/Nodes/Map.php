<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;
use DataStory\Parameters\String_;

class Map extends NodeModel
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
                $this->getParameter('property')
            }
        );
    }
}