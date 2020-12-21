<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;

class Filter extends NodeModel
{
    const IN_PORTS = ['Input'];
    const OUT_PORTS = ['Default'];

    public function run()
    {
        $features = $this->input();

        $this->output($features);
    }
}