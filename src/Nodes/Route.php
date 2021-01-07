<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\NodeModel;
use DataStory\Parameters\Number;
use DataStory\Parameters\String_;

class Route extends NodeModel
{
    const CATEGORY = Workflow::class;

    const IN_PORTS = [];    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('Route'),
        ];
    }

    public function run()
    {
        $this->output(
            collect([request()])
        );
    }

    public function publish()
    {
        \Illuminate\Support\Facades\Route::get('cool', function() {
            //
        });
    }
}