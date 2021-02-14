<?php

namespace DataStory\Nodes;

use DataStory\Node;

class Inspect extends Node
{
    const SHORT_DESCRIPTION  = 'Pipe data to a inspector table';

    const OUT_PORTS = [];

    const CATEGORY = Workflow::class;

    public function run()
    {
        $this->features = $this->input();
    }
}