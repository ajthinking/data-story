<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;

class Inspect extends NodeModel
{
    const SHORT_DESCRIPTION  = 'Pipe data to a inspector table';

    const OUT_PORTS = [];

    const CATEGORY = Workflow::class;

    public function run()
    {
        $this->features = $this->input();
    }
}