<?php

namespace DataStory\Nodes;

use DataStory\Categories\Laravel;
use DataStory\NodeModel;
use DataStory\Parameters\String_;

class ReturnJson extends NodeModel
{
    const CATEGORY = Laravel::class;

    const OUT_PORTS = [];    

    public static function parameters($data = [])
    {
        return [
            String_::make('node_name')->default('ReturnJSON'),
        ];
    }

    public function run()
    {
        $this->diagram()->setResult(
            $this->input()
        );
    }
}