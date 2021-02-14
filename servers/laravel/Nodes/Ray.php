<?php

namespace DataStory\Nodes;

use DataStory\Categories\Workflow;
use DataStory\Node;

class Ray extends Node
{
    const SHORT_DESCRIPTION  = 'Pass data to Spaties Ray tool';

    const CATEGORY = Workflow::class;

    const OUT_PORTS = [];

    public function run()
    {
        function_exists('ray') && ray($this->input());
    }
}