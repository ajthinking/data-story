<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\NodeModel;

class Pass extends NodeModel
{
    const SHORT_DESCRIPTION  = 'Does nothing :)';

    const CATEGORY = Workflow::class;

    public function run()
    {
        // Pass does nothing!
        $this->output(
            $this->input()
        );
    }
}