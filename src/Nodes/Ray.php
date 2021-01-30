<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\NodeModel;

class Ray extends NodeModel
{
    const SHORT_DESCRIPTION  = 'Pass data to Spaties Ray tool';

    const CATEGORY = Workflow::class;

    public function run()
    {
        ray($this->input());
    }
}