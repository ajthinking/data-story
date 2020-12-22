<?php

namespace DataStory\Nodes;

use DataStory\NodeModel;

class Filter extends NodeModel
{
    const IN_PORTS = ['Input'];

    const OUT_PORTS = ['Default'];

    const EDITABLE_OUT_PORTS = true;

    public function run()
    {
        $features = $this->input();

        $this->output($features);
    }
}