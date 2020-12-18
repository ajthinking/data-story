<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;

class Inspector extends NodeModel
{
    const OUT_PORTS = [];

    const CATEGORY = Workflow::class;

    public function run()
    {
        $this->features = $this->input();
    }
}